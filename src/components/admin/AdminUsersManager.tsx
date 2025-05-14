
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Database } from "@/integrations/supabase/database-types";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

const AdminUsersManager = () => {
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      setUsers(data || []);
    } catch (error: any) {
      toast.error(`Erro ao carregar usuários: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const updateUserType = async (userId: string, userType: "client" | "professional" | "admin") => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ user_type: userType })
        .eq("id", userId);

      if (error) {
        throw error;
      }

      toast.success("Tipo de usuário atualizado com sucesso");
      // Update local state
      setUsers(users.map(user => 
        user.id === userId ? { ...user, user_type: userType } : user
      ));
    } catch (error: any) {
      toast.error(`Erro ao atualizar usuário: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center p-8">Carregando usuários...</div>
      ) : (
        <Table>
          <TableCaption>Lista de todos os usuários do sistema</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Select
                    defaultValue={user.user_type}
                    onValueChange={(value) => 
                      updateUserType(user.id, value as "client" | "professional" | "admin")
                    }
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Tipo de usuário" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="client">Cliente</SelectItem>
                      <SelectItem value="professional">Prestador</SelectItem>
                      <SelectItem value="admin">Administrador</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateUserType(user.id, "admin")}
                    disabled={user.user_type === "admin"}
                  >
                    Promover a Admin
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

export default AdminUsersManager;
