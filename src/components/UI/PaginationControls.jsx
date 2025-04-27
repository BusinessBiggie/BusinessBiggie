import "../../css/pagination.css"

function PaginationControls({ page, setPage, hasMore }) {
    return (
      <div className="pagination-controls">
        <button
          className="pagination-button"
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          ← Prev
        </button>
        <span className="page-number">Page {page}</span>
        <button
          className="pagination-button"
          onClick={() => setPage((p) => p + 1)}
          disabled={!hasMore}
        >
          Next →
        </button>
      </div>
    );
  }
  
  export default PaginationControls;
  