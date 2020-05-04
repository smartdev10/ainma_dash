import React from 'react'
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";

const range = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};

function Paginations({ onPageChanged , totalRecords , pageLimit = 10 , pageNeighbours  = 0 ,currentPage = 1 }){
  

  // const [currentPage , setCurrentPage] = useState(1)

  const pageN =
    typeof pageNeighbours === "number"
      ? Math.max(0, Math.min(pageNeighbours, 2))
      : 0;

  const totalPages = Math.ceil(totalRecords / pageLimit);
 
  // const gotoPage = useCallback( (page) => {
  //   const currentPage = Math.max(0, Math.min(page, totalPages));
  //   setCurrentPage(currentPage)
  // }, 
  // [totalPages]
  // )

  // useEffect(() => {
  //   gotoPage(1)      
  // },[gotoPage])

  const handleClick = (page, evt) => {
    evt.preventDefault();
    // gotoPage(page);
    onPageChanged(page,totalPages)
  };


  const handleMoveLeft = evt => {
    evt.preventDefault();
    console.log(currentPage,totalPages)
    onPageChanged(currentPage - (pageN * 2) - 1 , totalPages)

    // gotoPage(currentPage - pageN * 2 - 1);
  };

  const handleMoveRight = evt => {
    evt.preventDefault();
    console.log(currentPage,pageN)
    onPageChanged(currentPage + (pageN * 2) + 1 ,totalPages)

    // gotoPage(currentPage + pageN * 2 + 1);
  };
  const fetchPageNumbers = () => {
    const pageNeighbours = pageN;

    const totalNumbers = pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      let pages = [];

      const leftBound = currentPage - pageNeighbours;
      const rightBound = currentPage + pageNeighbours;
      const beforeLastPage = totalPages - 1;

      const startPage = leftBound > 2 ? leftBound : 2;
      const endPage = rightBound < beforeLastPage ? rightBound : beforeLastPage;

      pages = range(startPage, endPage);

      const pagesCount = pages.length;
      const singleSpillOffset = totalNumbers - pagesCount - 1;

      const leftSpill = startPage > 2;
      const rightSpill = endPage < beforeLastPage;

      const leftSpillPage = LEFT_PAGE;
      const rightSpillPage = RIGHT_PAGE;

      if (leftSpill && !rightSpill) {
        const extraPages = range(startPage - singleSpillOffset, startPage - 1);
        pages = [leftSpillPage, ...extraPages, ...pages];
      } else if (!leftSpill && rightSpill) {
        const extraPages = range(endPage + 1, endPage + singleSpillOffset);
        pages = [...pages, ...extraPages, rightSpillPage];
      } else if (leftSpill && rightSpill) {
        pages = [leftSpillPage, ...pages, rightSpillPage];
      }

      return [1, ...pages, totalPages];
    }

    return range(1, totalPages);
  };
  if (!totalRecords) return null;

  if (totalPages === 1) return null;

  const pages = fetchPageNumbers();
  const headerClass = [
    "text-dark py-2 pr-4 m-0",
    currentPage ? "border-gray border-right" : ""
  ]
    .join(" ")
    .trim();
  return (
      <nav aria-label="...">
      <Pagination
        className="pagination justify-content-end mb-0"
        listClassName="justify-content-end mb-0"
      >
        {pages.map((page, index) => {
              if (page === LEFT_PAGE)
                return (
                  <PaginationItem key={index}>
                  <PaginationLink
                    href="#pablo"
                    onClick={handleMoveLeft}
                    tabIndex="-1"
                  >
                    <i className="fas fa-angle-left" />
                    <span className="sr-only">Previous</span>
                  </PaginationLink>
                </PaginationItem>
                );

              if (page === RIGHT_PAGE)
                return (

                  <PaginationItem key={index} >
                  <PaginationLink
                    href="#pablo"
                    onClick={handleMoveRight}
                  >
                    <i className="fas fa-angle-right" />
                    <span className="sr-only">Next</span>
                  </PaginationLink>
                </PaginationItem>
                );

              return (
                <PaginationItem key={index}  className={`page-item${
                  currentPage === page ? " active" : ""
                }`}>
                <PaginationLink
                  href="#"
                  onClick={e => handleClick(page, e)}
                >
                 {page}
                </PaginationLink>
              </PaginationItem>
              );
            })}
      </Pagination>
      <div className="d-inline">
         <h2 className={headerClass}>
            <strong>{totalRecords}</strong>{" "}
            total records
          </h2>
          {currentPage && (
            <span className="current-page">
              Page <span className="font-weight-bold">{currentPage}</span> /{" "}
              <span className="font-weight-bold">{totalPages}</span>
            </span>
          )}
      </div>
    </nav>
  )
}

 export default Paginations