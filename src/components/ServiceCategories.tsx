
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchServiceCategories, ServiceCategory } from "@/utils/serviceCategories";
import { Skeleton } from "@/components/ui/skeleton";

const ServiceCategories = () => {
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      const data = await fetchServiceCategories();
      setCategories(data);
      setLoading(false);
    };

    getCategories();
  }, []);

  return (
    <section id="servicos" className="section py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Categorias de Serviços
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Encontre profissionais qualificados para diversos tipos de serviços
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {loading
            ? Array(8)
                .fill(0)
                .map((_, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md p-6">
                    <Skeleton className="h-10 w-10 rounded-full mb-4" />
                    <Skeleton className="h-6 w-32 mb-2" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4 mt-1" />
                  </div>
                ))
            : categories.map((category) => (
                <div
                  key={category.id}
                  className="group relative bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
                  <p className="mt-2 text-sm text-gray-500">{category.description}</p>
                </div>
              ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/categorias"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90"
          >
            Ver todas as categorias
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServiceCategories;
