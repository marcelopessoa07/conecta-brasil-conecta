
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Separator } from "@/components/ui/separator";

const profileSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Digite um e-mail válido").optional(),
  phone: z.string().min(10, "Telefone deve ter pelo menos 10 dígitos").optional(),
  profession: z.string().min(3, "Profissão deve ter pelo menos 3 caracteres").optional(),
  bio: z.string().max(500, "Bio deve ter no máximo 500 caracteres").optional(),
  location: z.string().min(3, "Localização deve ter pelo menos 3 caracteres").optional(),
  address: z.string().optional(),
  experience: z.string().optional(),
  service_areas: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const ProfileEditor = () => {
  const { user, loading } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      profession: "",
      bio: "",
      location: "",
      address: "",
      experience: "",
      service_areas: "",
    },
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.id) return;

      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) {
          console.error("Error fetching profile:", error);
          return;
        }

        if (data) {
          form.reset({
            name: data.name || "",
            email: data.email || "",
            phone: data.phone || "",
            profession: data.profession || "",
            bio: data.bio || "",
            location: data.location || "",
            address: data.address || "",
            experience: data.experience || "",
            service_areas: data.service_areas ? data.service_areas.join(", ") : "",
          });
          setProfileImage(data.photo);
        }
      } catch (error) {
        console.error("Error in fetch operation:", error);
      }
    };

    if (!loading) {
      fetchProfile();
    }
  }, [user?.id, loading, form]);

  const onSubmit = async (values: ProfileFormValues) => {
    if (!user?.id) return;

    setIsSaving(true);
    try {
      const serviceAreas = values.service_areas
        ? values.service_areas.split(",").map(area => area.trim())
        : [];

      const { error } = await supabase
        .from("profiles")
        .update({
          name: values.name,
          phone: values.phone,
          profession: values.profession,
          bio: values.bio,
          location: values.location,
          address: values.address,
          experience: values.experience,
          service_areas: serviceAreas,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (error) {
        toast.error("Erro ao atualizar perfil");
        console.error("Error updating profile:", error);
        return;
      }

      toast.success("Perfil atualizado com sucesso");
    } catch (error) {
      console.error("Error in update operation:", error);
      toast.error("Erro ao atualizar perfil");
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user?.id) return;

    setIsImageUploading(true);
    try {
      // Upload to storage
      const fileExt = file.name.split(".").pop();
      const filePath = `${user.id}-${Date.now()}.${fileExt}`;
      
      const { error: uploadError, data } = await supabase.storage
        .from("profiles")
        .upload(filePath, file);

      if (uploadError) {
        toast.error("Erro ao fazer upload da imagem");
        console.error("Error uploading image:", uploadError);
        return;
      }

      // Get public URL
      const { data: publicURL } = supabase.storage
        .from("profiles")
        .getPublicUrl(filePath);

      if (!publicURL) {
        toast.error("Erro ao obter URL da imagem");
        return;
      }

      // Update profile
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ photo: publicURL.publicUrl })
        .eq("id", user.id);

      if (updateError) {
        toast.error("Erro ao atualizar foto de perfil");
        console.error("Error updating profile photo:", updateError);
        return;
      }

      setProfileImage(publicURL.publicUrl);
      toast.success("Foto de perfil atualizada com sucesso");
    } catch (error) {
      console.error("Error in image upload:", error);
      toast.error("Erro ao fazer upload da imagem");
    } finally {
      setIsImageUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-6">
        <div className="relative">
          <div className="h-24 w-24 rounded-full bg-gray-200 overflow-hidden">
            {profileImage ? (
              <img 
                src={profileImage} 
                alt="Foto de perfil" 
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-gray-500">
                Sem foto
              </div>
            )}
          </div>
          <div className="absolute -bottom-2 -right-2">
            <label htmlFor="profile-image" className="cursor-pointer">
              <div className="h-8 w-8 bg-primary text-white rounded-full flex items-center justify-center shadow-md">
                +
              </div>
              <input
                type="file"
                id="profile-image"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isImageUploading}
              />
            </label>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Seu Perfil Profissional</h2>
          <p className="text-sm text-gray-500">
            Mantenha seu perfil atualizado para atrair mais clientes
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome Completo*</FormLabel>
                  <FormControl>
                    <Input placeholder="Seu nome completo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone*</FormLabel>
                  <FormControl>
                    <Input placeholder="(11) 99999-9999" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Separator />
          <h3 className="text-lg font-medium">Dados Profissionais</h3>

          <FormField
            control={form.control}
            name="profession"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profissão/Especialidade*</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Eletricista, Encanador, Designer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Biografia</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Descreva sua experiência, formação e especialidades..."
                    {...field}
                    className="min-h-[100px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cidade/Estado*</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: São Paulo, SP" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Anos de Experiência</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: 5 anos" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="service_areas"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Áreas de Atuação</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Zona Sul, Zona Oeste (separados por vírgula)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button 
              type="submit" 
              disabled={isSaving}
              className="min-w-[150px]"
            >
              {isSaving ? "Salvando..." : "Salvar Perfil"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProfileEditor;
