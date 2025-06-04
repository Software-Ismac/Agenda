import { useMutation } from "@tanstack/react-query";
import { userRepository } from "../application/UserRepository";
export const useUser = () => {
  const createMutation = useMutation({
    mutationFn: (userData: User) => userRepository.create(userData),
    onSuccess: () => {},
    onError: () => {},
  });

  const updateMutation = useMutation({
    mutationFn: (userData: User) => userRepository.update(userData),
    onSuccess: () => {},
    onError: () => {},
  });

  const createUser = (user: User) => {
    createMutation.mutate(user);
  };

  const updateUser = (user: User) => {
    updateMutation.mutate(user);
  };

  return {
    createUser,
    updateUser,
    isCreating: createMutation.status == "pending",
    isUpdating: updateMutation.status == "pending",
  };
};
