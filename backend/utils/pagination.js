
function paginateUsers(data, page, size, sortKey, baseUrl = '/users') {
  // Ensure valid integers for page and size, with sensible defaults
  const currentPage = Math.max(1, parseInt(page, 10) || 1);
  const pageSize = Math.max(1, parseInt(size, 10) || 2);

  // Copy and optionally sort the data
  let sortedData = [...data];
  if (sortKey && data.length > 0) {
    const isDescending = sortKey.startsWith('-');
    const key = isDescending ? sortKey.slice(1) : sortKey;

    // Sort only if the provided key exists in the data
    if (key in data[0]) {
      sortedData.sort((a, b) => {
        const valA = a[key];
        const valB = b[key];

        // Handle string sorting (case-insensitive)
        if (typeof valA === 'string' && typeof valB === 'string') {
          return isDescending
            ? valB.localeCompare(valA)
            : valA.localeCompare(valB);
        }

        // Fallback for numeric or other comparable types
        return isDescending ? (valA < valB ? 1 : -1) : (valA > valB ? 1 : -1);
      });
    }
  }

  // Paginate the sorted data
  const totalResults = sortedData.length;
  const totalPages = Math.ceil(totalResults / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const results = sortedData.slice(startIndex, startIndex + pageSize);

  // Build pagination navigation links
  const paging = {
    totalResults,
    totalPages,
    currentPage,
    pageSize,
    previous: currentPage > 1
      ? `${baseUrl}?page=${currentPage - 1}&size=${pageSize}${sortKey ? `&sort=${sortKey}` : ''}`
      : null,
    next: startIndex + pageSize < totalResults
      ? `${baseUrl}?page=${currentPage + 1}&size=${pageSize}${sortKey ? `&sort=${sortKey}` : ''}`
      : null,
  };

  return { results, paging };
}

module.exports = { paginateUsers };
