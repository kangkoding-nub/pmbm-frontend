// Both room.services and year.services export 'get' aliases.
// Re-export selectively to avoid name collision.
export {
    getRooms,
    storeRoom,
    updateRoom,
    deleteRoom,
} from './room.services';
export {
    getYears,
    storeYear,
    updateYear,
    deleteYear,
} from './year.services';
