export function getBook (state) {
  return (id) => state.books[id]
}
