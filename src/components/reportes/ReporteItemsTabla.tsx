import React from 'react';
import {View, StyleSheet } from '@react-pdf/renderer';
import ReporteTablaHeader from './ReporteTablaHeader';
import ReporteTablaRows from './ReporteTablaRows';
import RepoprteTablasEspaciosEnBlaco from './RepoprteTablasEspaciosEnBlaco';
import ReporteTablaFooter from './ReporteTablaFooter';

const tableRowsCount = 11;

const styles = StyleSheet.create({
    tableContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 24,
        borderWidth: 1,
        borderColor: '#bff0fd',
    },
});

  const ReporteItemsTabla = ({reporte}) => (
    <View style={styles.tableContainer}>
        <ReporteTablaHeader />
        <ReporteTablaRows items={reporte.items} />
        <RepoprteTablasEspaciosEnBlaco rowsCount={ tableRowsCount - reporte.items.length} />
        <ReporteTablaFooter items={reporte.items} />
    </View>
  );
  
  export default ReporteItemsTabla;