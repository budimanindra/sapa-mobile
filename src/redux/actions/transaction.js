// import http from '../../helpers/http';

// export const transactionData = (transactionDetails) => {
//   return async (dispatch) => {
//     try {
//       dispatch({
//         type: 'SAVE_TRANSACTION_DETAILS',
//         payload: transactionDetails,
//       });
//     } catch (err) {
//       const {message} = err.response.data;
//       dispatch({
//         type: 'SET_TRANSACTION_MESSAGE',
//         payload: message,
//       });
//     }
//   };
// };

// export const doTransaction = (transactionDetails) => {
//   return async (dispatch) => {
//     const params = new URLSearchParams();
//     params.append('idCinema', transactionDetails.cinemaId);
//     params.append('idShowtimes', transactionDetails.showtimeId);
//     params.append('date', transactionDetails.date);
//     for (let i = 0; i < transactionDetails.seat.length; i++) {
//       const idSeat = transactionDetails.seat[i];
//       params.append('idSeats', idSeat);
//     }
//     try {
//       const results = await http().post('/tickets', params);
//       dispatch({
//         type: 'DO_TRANSACTION',
//         payload: transactionDetails,
//       });
//     } catch (err) {
//       const {message} = err.response.data;
//       dispatch({
//         type: 'SET_TRANSACTION_MESSAGE',
//         payload: message,
//       });
//     }
//   };
// };
