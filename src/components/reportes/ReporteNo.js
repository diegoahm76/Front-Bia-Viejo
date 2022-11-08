import React, { Fragment } from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    reporteNoContainer: {
        flexDirection: 'row',
        marginTop: 36,
        justifyContent: 'flex-end'
    },
    reporteDateContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    reporteDate: {
            fontSize: 12,
            fontStyle: 'bold',
    },
    label: {
        width: 60
    }
    
  });


  const ReporteNo = ({reporte}) => (
        <Fragment>
            <View style={styles.reporteNoContainer}>
                <Text style={styles.label}>Reporte No:</Text>
                <Text style={styles.reporteDate}>{reporte.reporte_no}</Text>
            </View >
            <View style={styles.reporteDateContainer}>
                <Text style={styles.label}>Date: </Text>
                <Text >{reporte.trans_date}</Text>
            </View >
        </Fragment>
  );
  
  export default ReporteNo;