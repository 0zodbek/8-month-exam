import React, {useState} from 'react'
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
function pagi() {
    const [currentPage, setCurrentPage] = useState(8);
  const totalPages = 20;
  return (
    <div>
        <ResponsivePagination
      current={currentPage}
      total={totalPages}
      onPageChange={setCurrentPage}
    />
    </div>
  )
}

export default pagi