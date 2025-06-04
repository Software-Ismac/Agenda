import { useUser } from "@/backend";
import { useRouter } from "next/router";
import { useOpenBaas } from "openbaas-sdk-react";
import React, { useEffect, useState } from "react";

function AccessAdmin({ children }: { children: React.ReactNode }) {
  const { user } = useUser();

  const { uri, accessToken } = useOpenBaas();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await fetch(`${uri}/v1/admin/${user?.email}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.status === 404 || response.status == 400) {
          router.back();
        } else if (response.status === 202) {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching admin data:", error);
        router.back();
      }
    };
    fetchAdmin();
  }, [router.query.id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return <div>{children}</div>;
}

export default AccessAdmin;
