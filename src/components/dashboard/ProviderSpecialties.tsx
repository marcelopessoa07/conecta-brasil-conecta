
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { 
  fetchServiceCategories, 
  ServiceCategory, 
  updateProfileSpecialties,
  getUserSpecialties 
} from "@/utils/serviceCategories";
import { Skeleton } from "@/components/ui/skeleton";

const ProviderSpecialties = () => {
  const { user } = useAuth();
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      if (!user?.id) return;
      
      setLoading(true);
      try {
        // Fetch all categories
        const categoriesData = await fetchServiceCategories();
        setCategories(categoriesData);
        
        // Fetch user's selected specialties
        const specialties = await getUserSpecialties(user.id);
        setSelectedCategories(new Set(specialties));
      } catch (error) {
        console.error("Error loading specialties data:", error);
        toast.error("Erro ao carregar categorias de serviço");
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [user?.id]);

  const handleCategoryToggle = (categoryId: string) => {
    const newSelection = new Set(selectedCategories);
    if (newSelection.has(categoryId)) {
      newSelection.delete(categoryId);
    } else {
      newSelection.add(categoryId);
    }
    setSelectedCategories(newSelection);
  };

  const handleSaveSpecialties = async () => {
    if (!user?.id) return;
    
    setSaving(true);
    try {
      const result = await updateProfileSpecialties(
        user.id, 
        Array.from(selectedCategories)
      );
      
      if (result.success) {
        toast.success("Especialidades atualizadas com sucesso");
      } else {
        toast.error("Erro ao atualizar especialidades");
      }
    } catch (error) {
      console.error("Error saving specialties:", error);
      toast.error("Erro ao salvar especialidades");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Minhas Especialidades</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            {Array(8).fill(0).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-4 w-4 rounded" />
                <Skeleton className="h-6 w-40" />
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              {categories.map((category) => (
                <div 
                  key={category.id} 
                  className="flex items-center space-x-3 border rounded-md p-3 hover:bg-muted/50"
                >
                  <Checkbox 
                    id={`category-${category.id}`}
                    checked={selectedCategories.has(category.id)}
                    onCheckedChange={() => handleCategoryToggle(category.id)}
                  />
                  <label 
                    htmlFor={`category-${category.id}`} 
                    className="flex items-center cursor-pointer"
                  >
                    <span className="mr-2">{category.icon}</span>
                    <span>{category.name}</span>
                  </label>
                </div>
              ))}
            </div>
            <div className="flex justify-end">
              <Button 
                onClick={handleSaveSpecialties} 
                disabled={saving}
              >
                {saving ? "Salvando..." : "Salvar Especialidades"}
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ProviderSpecialties;
