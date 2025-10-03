export const toUserDTO = (user) => {
  if (!user) return null;
  const { _id, id, first_name, last_name, email, age, role, createdAt, updatedAt } = user;
  return { id: (id || _id)?.toString(), first_name, last_name, email, age, role, createdAt, updatedAt };
};
