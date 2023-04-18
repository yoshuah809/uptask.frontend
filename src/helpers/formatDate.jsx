const formatDate = (date) => {
  const newDate = new Date(date.split("T")[0].split("-"));

  const options = {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return newDate.toLocaleDateString("en-EN", options);
};

export default formatDate;
