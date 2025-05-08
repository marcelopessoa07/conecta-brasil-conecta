
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Grid, Trash2, Plus, Upload, Image } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

type PortfolioItem = {
  id: string;
  provider_id: string;
  title: string;
  description: string | null;
  image_url: string;
  created_at: string;
};

const PortfolioManager = () => {
  const { user } = useAuth();
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      if (!user?.id) return;

      try {
        const { data, error } = await supabase
          .from("provider_portfolio")
          .select("*")
          .eq("provider_id", user.id)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching portfolio:", error);
          return;
        }

        setPortfolioItems(data || []);
      } catch (error) {
        console.error("Error in fetch operation:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [user?.id]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id || !imageFile || !title.trim()) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    setIsUploading(true);
    try {
      // 1. Upload image to storage
      const fileExt = imageFile.name.split(".").pop();
      const filePath = `portfolio/${user.id}/${Date.now()}.${fileExt}`;

      const { error: uploadError, data: uploadData } = await supabase.storage
        .from("portfolio")
        .upload(filePath, imageFile);

      if (uploadError) {
        toast.error("Erro ao fazer upload da imagem");
        console.error("Error uploading image:", uploadError);
        return;
      }

      // 2. Get public URL
      const { data: publicURL } = supabase.storage
        .from("portfolio")
        .getPublicUrl(filePath);

      if (!publicURL) {
        toast.error("Erro ao obter URL da imagem");
        return;
      }

      // 3. Create portfolio item
      const { error: insertError } = await supabase
        .from("provider_portfolio")
        .insert({
          provider_id: user.id,
          title,
          description,
          image_url: publicURL.publicUrl,
        });

      if (insertError) {
        toast.error("Erro ao adicionar item ao portfólio");
        console.error("Error creating portfolio item:", insertError);
        return;
      }

      // 4. Reset form and refresh data
      setTitle("");
      setDescription("");
      setImageFile(null);
      setImagePreview(null);
      setOpen(false);
      
      // 5. Fetch updated portfolio
      const { data: updatedData, error } = await supabase
        .from("provider_portfolio")
        .select("*")
        .eq("provider_id", user.id)
        .order("created_at", { ascending: false });
      
      if (!error && updatedData) {
        setPortfolioItems(updatedData);
      }
      
      toast.success("Item adicionado ao portfólio com sucesso");
    } catch (error) {
      console.error("Error in portfolio submission:", error);
      toast.error("Erro ao adicionar item ao portfólio");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string, imageUrl: string) => {
    if (!confirm("Tem certeza que deseja excluir este item do portfólio?")) {
      return;
    }

    try {
      // 1. Delete portfolio item
      const { error: deleteError } = await supabase
        .from("provider_portfolio")
        .delete()
        .eq("id", id);

      if (deleteError) {
        toast.error("Erro ao excluir item do portfólio");
        console.error("Error deleting portfolio item:", deleteError);
        return;
      }
      
      // 2. Delete image from storage (if possible - may fail if URL format is not recognized)
      try {
        const path = imageUrl.split("/").slice(-2).join("/");
        if (path) {
          await supabase.storage.from("portfolio").remove([path]);
        }
      } catch (imgError) {
        console.warn("Could not delete image file:", imgError);
      }

      // 3. Update portfolio list
      setPortfolioItems(portfolioItems.filter(item => item.id !== id));
      toast.success("Item removido do portfólio");
    } catch (error) {
      console.error("Error in delete operation:", error);
      toast.error("Erro ao excluir item do portfólio");
    }
  };

  if (loading) {
    return <div>Carregando seu portfólio...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold">Seu Portfólio</h2>
          <p className="text-sm text-muted-foreground">
            Adicione fotos de seus trabalhos para atrair mais clientes
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Adicionar Item
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar ao Portfólio</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título*</Label>
                <Input 
                  id="title" 
                  placeholder="Ex: Reforma de Banheiro"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea 
                  id="description" 
                  placeholder="Descreva o trabalho realizado..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="image">Imagem*</Label>
                <div className="border-2 border-dashed rounded-md p-4 text-center">
                  {imagePreview ? (
                    <div className="relative">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="max-h-[200px] mx-auto object-contain"
                      />
                      <Button 
                        type="button"
                        variant="ghost" 
                        size="sm"
                        className="absolute top-1 right-1 h-8 w-8 rounded-full p-0"
                        onClick={() => {
                          setImageFile(null);
                          setImagePreview(null);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <label htmlFor="image-upload" className="cursor-pointer block p-4">
                      <div className="flex flex-col items-center">
                        <Upload className="h-8 w-8 mb-2 text-gray-400" />
                        <span className="text-sm text-gray-500">
                          Clique para selecionar uma imagem
                        </span>
                      </div>
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                        required
                      />
                    </label>
                  )}
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isUploading || !imageFile}
              >
                {isUploading ? "Adicionando..." : "Adicionar ao Portfólio"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {portfolioItems.length === 0 ? (
        <div className="bg-muted/50 rounded-lg p-8 text-center">
          <Image className="h-12 w-12 mx-auto mb-3 text-gray-400" />
          <h3 className="text-lg font-medium">Seu portfólio está vazio</h3>
          <p className="text-sm text-muted-foreground mt-1 mb-4">
            Adicione fotos dos seus trabalhos para atrair mais clientes
          </p>
          <Button 
            onClick={() => setOpen(true)}
            variant="secondary"
          >
            <Plus className="mr-2 h-4 w-4" /> Adicionar Primeiro Item
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {portfolioItems.map((item) => (
            <Card key={item.id}>
              <div className="aspect-square overflow-hidden relative">
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="object-cover w-full h-full"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8 rounded-full"
                  onClick={() => handleDelete(item.id, item.image_url)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold">{item.title}</h3>
                {item.description && (
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">{item.description}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PortfolioManager;
