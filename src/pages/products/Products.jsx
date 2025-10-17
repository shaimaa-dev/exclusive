import useData from "../../hooks/useData"
import ProductCard from "./components/ProductCard"


const Products = () => {
  const { products, dispatch } = useData();
  const handlePageChange = (page) => {
    dispatch({ type: "SET_PAGE", payload: page });
  };
  const getPageNumbers = () => {
    const pages = [];
    const currentPage = products.page;
    const totalPages = products.pages;

    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);
    // add first page
    pages.push(1);
    if (startPage > 2) pages.push("...");
    // loop on current page ,previous , next page
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    // if end page smaller than total pages push (...)
    if (endPage < totalPages - 1) pages.push("...");
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };
  const pageNumbers = getPageNumbers();
  console.log(products)
  const viewProducts = products.productslist.map((product) => {
    return (
      <ProductCard key={product.id} product={product} haveDiscount={true} />
    )
  })
  return (
    <div className="w-[85%] mx-auto mt-[100px]">
      <div className=" my-12 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" >
        {viewProducts}
      </div>
      <div className="flex gap-2 justify-center mt-6">
        <button
          disabled={products.page === 1}
          onClick={() => handlePageChange(products.page - 1)}
        >
          Prev
        </button>

        {pageNumbers.map((page, index) =>
          page === "..." ? (
            <span key={index}>...</span>
          ) : (
            <button
              key={index}
              onClick={() => handlePageChange(page)}
              style={{ fontWeight: page === products.page ? "bold" : "normal" }}
              className={`${page === products.page
                  ? "bg-buttoncolor p-2 h-[25px] w-[25px] text-xl flex items-center justify-center rounded-full text-white font-bold"
                  : "bg-white text-black"
                }`}
            >
              {page}
            </button>
          )
        )}

        <button
          disabled={products.page === products.pages}
          onClick={() => handlePageChange(products.page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Products
