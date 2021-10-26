export function getBook (state) {
  return (id) => state.books[id]
}

export function getTrack (state) {
  return (bookId, trackId) => {
    if (!state.books[bookId]) {
      throw new Error(`Book '${bookId}' not found`)
    }
    return state.books[bookId].tracks[trackId]
  }
}
