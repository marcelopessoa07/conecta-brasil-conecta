
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Image, Plus, Trash2, Edit } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface PortfolioItem {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  created_at: string;
}

const PortfolioManager = () => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchPortfolioItems();
  }, [user?.id]);

  const fetchPortfolioItems = async () => {
    if (!user?.id) return;

    try {
      setLoading(true);
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id || !selectedFile || !title) {
      toast.error("Preencha o título e selecione uma imagem");
      return;
    }

    setIsUploading(true);
    try {
      // 1. Upload image to storage
      const fileExt = selectedFile.name.split(".").pop();
      const filePath = `portfolio/${user.id}/${Date.now()}.${fileExt}`;
      
      const { error: uploadError, data } = await supabase.storage
        .from("service_images")
        .upload(filePath, selectedFile);

      if (uploadError) {
        toast.error("Erro ao fazer upload da imagem");
        console.error("Error uploading image:", uploadError);
        return;
      }

      // 2. Get public URL
      const { data: publicUrlData } = supabase.storage
        .from("service_images")
        .getPublicUrl(filePath);

      if (!publicUrlData?.publicUrl) {
        toast.error("Erro ao obter URL da imagem");
        return;
      }

      // 3. Create portfolio item
      const { error: insertError } = await supabase
        .from("provider_portfolio")
        .insert({
          provider_id: user.id,
          title,
          description: description || null,
          image_url: publicUrlData.publicUrl
        });

      if (insertError) {
        toast.error("Erro ao adicionar item ao portfólio");
        console.error("Error inserting portfolio item:", insertError);
        return;
      }

      toast.success("Item adicionado ao portfólio com sucesso!");
      setTitle("");
      setDescription("");
      setSelectedFile(null);
      setPreviewUrl(null);
      setDialogOpen(false);
      fetchPortfolioItems();
    } catch (error) {
      console.error("Error in upload operation:", error);
      toast.error("Erro ao adicionar item ao portfólio");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este item?")) return;

    try {
      const { error } = await supabase
        .from("provider_portfolio")
        .delete()
        .eq("id", id);

      if (error) {
        toast.error("Erro ao excluir item");
        console.error("Error deleting portfolio item:", error);
        return;
      }

      toast.success("Item excluído com sucesso");
      setPortfolioItems(portfolioItems.filter(item => item.id !== id));
    } catch (error) {
      console.error("Error in delete operation:", error);
      toast.error("Erro ao excluir item");
    }
  };

  if (loading && portfolioItems.length === 0) {
    return <div>Carregando portfólio...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Seu Portfólio</h2>
          <p className="text-sm text-gray-500">
            Adicione fotos de seus trabalhos para demonstrar sua qualidade
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Adicionar Trabalho
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Adicionar Trabalho ao Portfólio</DialogTitle>
              <DialogDescription>
                Mostre aos clientes exemplos dos seus melhores trabalhos.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Título*</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ex: Reforma de Cozinha"
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Descrição breve do trabalho realizado..."
                    className="min-h-[80px]"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="image">Imagem*</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-4">
                    {previewUrl ? (
                      <div className="relative">
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="max-h-[200px] mx-auto rounded-md"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => {
                            setSelectedFile(null);
                            setPreviewUrl(null);
                          }}
                        >
                          Remover
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-4">
                        <Image className="h-10 w-10 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500 mb-2">
                          Clique para selecionar uma imagem
                        </p>
                        <input
                          type="file"
                          id="image"
                          className="hidden"
                          accept="image/*"
                          onChange={handleFileChange}
                          required
                        />
                        <label htmlFor="image">
                          <Button type="button" variant="outline" size="sm">
                            Escolher Arquivo
                          </Button>
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button type="submit" disabled={isUploading || !selectedFile}>
                  {isUploading ? "Enviando..." : "Adicionar ao Portfólio"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {portfolioItems.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-md">
          <Image className="h-12 w-12 mx-auto text-gray-400 mb-3" />
          <h3 className="text-lg font-medium mb-2">Seu portfólio está vazio</h3>
          <p className="text-sm text-gray-500 mb-4">
            Adicione imagens dos seus trabalhos para impressionar clientes potenciais.
          </p>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>Adicionar Primeiro Trabalho</Button>
            </DialogTrigger>
          </Dialog>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {portfolioItems.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="aspect-w-16 aspect-h-9 bg-gray-100 relative">
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="object-cover w-full h-48"
                />
                <div className="absolute top-2 right-2 flex space-x-1">
                  <Button
                    size="sm"
                    variant="destructive"
                    className="h-8 w-8 p-0"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-1">{item.title}</h3>
                {item.description && (
                  <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
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
