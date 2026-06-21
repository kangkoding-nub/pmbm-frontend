export * from './services/receipt';
export {
    cashPayment as cash,
    getActiveGateway,
    sendPaymentWhatsapp as sendWhatsapp,
} from './services/payment';
export {
    getGateways as getGateway,
    updateGateway,
} from './services/gateway';
export { getTransactionDashboard as dashboardTransaction } from './services/transaction';
