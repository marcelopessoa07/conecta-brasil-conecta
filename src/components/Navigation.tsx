
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Home, User, PlusCircle, LogOut, LogIn, UserPlus, Settings } from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  
  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  
  return (
    <div className="sticky top-0 z-30 flex w-full justify-center bg-background/95 py-2 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link to="/">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <Home className="mr-2 h-4 w-4" />
                Início
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          {user ? (
            <>
              <NavigationMenuItem>
                <Link to="/dashboard">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <User className="mr-2 h-4 w-4" />
                    Dashboard
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              
              {user.profile?.user_type === "client" && (
                <NavigationMenuItem>
                  <Link to="/new-request">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Nova Solicitação
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              )}
              
              {user.profile?.user_type === "admin" && (
                <NavigationMenuItem>
                  <Link to="/admin">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      <Settings className="mr-2 h-4 w-4" />
                      Admin
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              )}
              
              <NavigationMenuItem>
                <Button variant="ghost" onClick={handleSignOut} className={cn(navigationMenuTriggerStyle(), "cursor-pointer")}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sair
                </Button>
              </NavigationMenuItem>
            </>
          ) : (
            <>
              <NavigationMenuItem>
                <Link to="/auth">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <LogIn className="mr-2 h-4 w-4" />
                    Entrar
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="/auth?tab=register">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Cadastrar
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </>
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default Navigation;
