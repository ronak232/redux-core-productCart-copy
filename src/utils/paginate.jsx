function paginate(productShow) {
  const itemPerPage = 10; // Items per page to visible in pagination
  const totalPagesNumber = Math.ceil(productShow?.length / itemPerPage); // Number of pages to show all products

  const arrayToItemsPerPage = Array.from(
    { length: totalPagesNumber },
    (_, index) => {
      const startPaginateNumber = index * totalPagesNumber;
      return productShow?.slice(
        startPaginateNumber,
        startPaginateNumber + itemPerPage
      );
    }
  );
  return arrayToItemsPerPage;
}

export default paginate;
