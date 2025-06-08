// components/pdf/InvoiceGenerator.tsx
import React from 'react';
import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer';
import { Order } from '@/types/OrderTypes';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 40,
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
    borderBottom: 2,
    borderBottomColor: '#e1e5e9',
    paddingBottom: 20,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  invoice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#374151',
  },
  billTo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  billSection: {
    width: '45%',
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#6b7280',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  text: {
    fontSize: 10,
    color: '#374151',
    marginBottom: 4,
  },
  table: {
    display: 'table',
    width: '100%',
    marginTop: 20,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#e1e5e9',
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableColHeader: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#e1e5e9',
    backgroundColor: '#f9fafb',
    padding: 8,
  },
  tableCol: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#e1e5e9',
    padding: 8,
  },
  tableCellHeader: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#374151',
  },
  tableCell: {
    fontSize: 9,
    color: '#374151',
  },
  totals: {
    marginTop: 20,
    alignItems: 'flex-end',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 200,
    marginBottom: 4,
  },
  totalLabel: {
    fontSize: 10,
    color: '#6b7280',
  },
  totalValue: {
    fontSize: 10,
    color: '#374151',
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 40,
    paddingTop: 20,
    borderTop: 1,
    borderTopColor: '#e1e5e9',
    fontSize: 8,
    color: '#6b7280',
    textAlign: 'center',
  },
});

interface InvoiceDocumentProps {
  order: Order;
}

const InvoiceDocument: React.FC<InvoiceDocumentProps> = ({ order }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>Your Store Name</Text>
        <View>
          <Text style={styles.invoice}>INVOICE</Text>
          <Text style={styles.text}>#{order.orderId.slice(-8)}</Text>
          <Text style={styles.text}>Date: {new Date(order.createdAt).toLocaleDateString()}</Text>
        </View>
      </View>

      {/* Bill To Section */}
      <View style={styles.billTo}>
        <View style={styles.billSection}>
          <Text style={styles.sectionTitle}>Bill To:</Text>
          <Text style={styles.text}>{order.userDetails.name}</Text>
          <Text style={styles.text}>{order.userDetails.email}</Text>
          <Text style={styles.text}>{order.userDetails.phone}</Text>
        </View>
        <View style={styles.billSection}>
          <Text style={styles.sectionTitle}>Ship To:</Text>
          <Text style={styles.text}>{order.deliveryAddress.name}</Text>
          <Text style={styles.text}>{order.deliveryAddress.address}</Text>
          <Text style={styles.text}>{order.deliveryAddress.pincode}</Text>
          <Text style={styles.text}>{order.deliveryAddress.phone}</Text>
        </View>
      </View>

      {/* Items Table */}
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Item</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Quantity</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Price</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Total</Text>
          </View>
        </View>
        {order.items.map((item, index) => (
          <View style={styles.tableRow} key={index}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.name}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.quantity}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Rs.{item.price}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Rs.{(item.quantity * item.price).toFixed(2)}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Totals */}
      <View style={styles.totals}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Subtotal:</Text>
          <Text style={styles.totalValue}>
            Rs.{order.items.reduce((sum, item) => sum + (item.quantity * item.price), 0).toFixed(2)}
          </Text>
        </View>
        {order.discount && order.discount > 0 && (
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Discount:</Text>
            <Text style={styles.totalValue}>-Rs.{order.discount.toFixed(2)}</Text>
          </View>
        )}
        {order.tax && order.tax > 0 && (
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Tax:</Text>
            <Text style={styles.totalValue}>Rs.{order.tax.toFixed(2)}</Text>
          </View>
        )}
        {order.shippingCost && order.shippingCost > 0 && (
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Shipping:</Text>
            <Text style={styles.totalValue}>Rs.{order.shippingCost.toFixed(2)}</Text>
          </View>
        )}
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalValue}>Rs.{order.totalAmount.toFixed(2)}</Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text>Thank you for your business!</Text>
        <Text>Contact us: padmavtimarketing5554@gmail.com | +91-9116045123</Text>
        <Text>Order ID: {order.orderId} | Status: {order.status.toUpperCase()}</Text>
      </View>
    </Page>
  </Document>
);

export const generateInvoicePDF = async (order: Order) => {
  try {
    const blob = await pdf(<InvoiceDocument order={order} />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `invoice-${order.orderId.slice(-8)}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};

export default InvoiceDocument;