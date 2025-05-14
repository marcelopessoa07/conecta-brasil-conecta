
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Pencil, Trash2, Plus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Category = {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  created_at: string;
  updated_at: string;
};

const AdminCategoriesManager = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    icon: "🔧",
  });

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("service_categories")
        .select("*")
        .order("name");

      if (error) {
        throw error;
      }

      setCategories(data);
    } catch (error: any) {
      toast.error(`Erro ao carregar categorias: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const addCategory = async () => {
    try {
      if (!newCategory.name.trim()) {
        toast.error("O nome da categoria é obrigatório");
        return;
      }

      const { error } = await supabase
        .from("service_categories")
        .insert({
          name: newCategory.name.trim(),
          description: newCategory.description || null,
          icon: newCategory.icon || null,
        });

      if (error) {
        throw error;
      }

      toast.success("Categoria adicionada com sucesso");
      setNewCategory({ name: "", description: "", icon: "🔧" });
      setIsAddDialogOpen(false);
      fetchCategories();
    } catch (error: any) {
      toast.error(`Erro ao adicionar categoria: ${error.message}`);
    }
  };

  const updateCategory = async () => {
    try {
      if (!editingCategory || !editingCategory.name.trim()) {
        toast.error("O nome da categoria é obrigatório");
        return;
      }

      const { error } = await supabase
        .from("service_categories")
        .update({
          name: editingCategory.name.trim(),
          description: editingCategory.description,
          icon: editingCategory.icon,
          updated_at: new Date().toISOString(),
        })
        .eq("id", editingCategory.id);

      if (error) {
        throw error;
      }

      toast.success("Categoria atualizada com sucesso");
      setIsEditDialogOpen(false);
      fetchCategories();
    } catch (error: any) {
      toast.error(`Erro ao atualizar categoria: ${error.message}`);
    }
  };

  const deleteCategory = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta categoria?")) {
      return;
    }

    try {
      const { error } = await supabase
        .from("service_categories")
        .delete()
        .eq("id", id);

      if (error) {
        throw error;
      }

      toast.success("Categoria excluída com sucesso");
      fetchCategories();
    } catch (error: any) {
      toast.error(`Erro ao excluir categoria: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-1">
              <Plus size={16} /> Nova Categoria
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Categoria</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  value={newCategory.name}
                  onChange={(e) =>
                    setNewCategory({ ...newCategory, name: e.target.value })
                  }
                  placeholder="Nome da categoria"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="icon">Ícone</Label>
                <Input
                  id="icon"
                  value={newCategory.icon}
                  onChange={(e) =>
                    setNewCategory({ ...newCategory, icon: e.target.value })
                  }
                  placeholder="Emoji ou código de ícone"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={newCategory.description}
                  onChange={(e) =>
                    setNewCategory({ ...newCategory, description: e.target.value })
                  }
                  placeholder="Descrição da categoria"
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <Button onClick={addCategory}>Adicionar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="flex justify-center p-8">Carregando categorias...</div>
      ) : (
        <Table>
          <TableCaption>Lista de categorias de serviços</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Ícone</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead className="w-[150px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium text-xl">{category.icon}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.description}</TableCell>
                <TableCell className="flex space-x-2">
                  <Dialog open={isEditDialogOpen && editingCategory?.id === category.id} onOpenChange={(open) => {
                    setIsEditDialogOpen(open);
                    if (!open) setEditingCategory(null);
                  }}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          setEditingCategory(category);
                          setIsEditDialogOpen(true);
                        }}
                      >
                        <Pencil size={16} />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Editar Categoria</DialogTitle>
                      </DialogHeader>
                      {editingCategory && (
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="edit-name">Nome</Label>
                            <Input
                              id="edit-name"
                              value={editingCategory.name}
                              onChange={(e) =>
                                setEditingCategory({
                                  ...editingCategory,
                                  name: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-icon">Ícone</Label>
                            <Input
                              id="edit-icon"
                              value={editingCategory.icon || ""}
                              onChange={(e) =>
                                setEditingCategory({
                                  ...editingCategory,
                                  icon: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-description">Descrição</Label>
                            <Textarea
                              id="edit-description"
                              value={editingCategory.description || ""}
                              onChange={(e) =>
                                setEditingCategory({
                                  ...editingCategory,
                                  description: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                      )}
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Cancelar</Button>
                        </DialogClose>
                        <Button onClick={updateCategory}>Salvar</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="outline"
                    size="icon"
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => deleteCategory(category.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default AdminCategoriesManager;
