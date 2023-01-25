const formatDate = (dateString: string) => {
  const options: object = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

export { formatDate };
