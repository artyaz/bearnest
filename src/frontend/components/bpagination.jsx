import "material-icons/iconfont/material-icons.css";

export default function BearnestPagination({
  pages,
  currentPage,
  onPageChange,
}) {
  const cropped = pages > 5;

  const maxVisiblePage = currentPage + 2 > pages ? pages : currentPage + 2;
  const minVisiblePage = currentPage - 2 < 1 ? 1 : currentPage - 2;

  const nextPage = currentPage + 1 > pages ? currentPage : currentPage + 1;
  const previousPage = currentPage - 1 < 1 ? currentPage : currentPage - 1;

  const pageNumbers = [];
  for (let index = minVisiblePage; index <= maxVisiblePage; index++) {
    pageNumbers.push(index);
  }

  return (
    <div class="">
      <div class="flex max-w-fit items-center space-x-2 rounded-lg border border-zinc-200 bg-white p-2">
        <button
          onClick={() => onPageChange(1)}
          class="flex items-center justify-center"
        >
          <span class="material-icons-round">keyboard_double_arrow_left</span>
        </button>
        <button
          onClick={() => onPageChange(previousPage)}
          class="flex items-center justify-center"
        >
          <span class="material-icons-round">keyboard_arrow_left</span>
        </button>
        <div class="flex space-x-5">
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => onPageChange(number)}
              className={`flex items-center justify-center font-e-ukraine text-sm ${
                number === currentPage ? "text-black" : "text-gray-500"
              }`}
            >
              <span>{number}</span>
            </button>
          ))}
        </div>
        <button
          onClick={() => onPageChange(nextPage)}
          class="flex items-center justify-center"
        >
          <span class="material-icons-round">keyboard_arrow_right</span>
        </button>
        <button
          onClick={() => onPageChange(pages)}
          class="flex items-center justify-center"
        >
          <span class="material-icons-round">keyboard_double_arrow_right</span>
        </button>
      </div>
    </div>
  );
}
