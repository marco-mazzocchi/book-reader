/**
 * Show or hide the drawer programmatically
 * @param {*} state
 * @param {bool} payload
 */
export function setDrawerIsOpen (state, payload) {
  state.drawerIsOpen = payload
}

export function toggleDrawer (state) {
  state.drawerIsOpen = !state.drawerIsOpen
}
