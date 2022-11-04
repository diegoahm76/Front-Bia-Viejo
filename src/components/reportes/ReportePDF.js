import React from 'react';
import { Page, Document, Image, StyleSheet } from '@react-pdf/renderer';
import ReporteTitulo from './ReporteTitulo';
import ReporteItemsTabla from './ReporteItemsTabla';
import ReporteNo from './ReporteNo';


const styles = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        fontSize: 11,
        paddingTop: 30,
        paddingLeft:60,
        paddingRight:60,
        lineHeight: 1.5,
        flexDirection: 'column',
    }, 
    logo: {
        width: 74,
        height: 66,
        marginLeft: 'auto',
        marginRight: 'auto'
    }
  });
  
  const ReportePDF = ({reporte}) => (
            <Document>
                <Page size="A4" style={styles.page}>
                   
                    <ReporteTitulo title='Reporte'/>
                    <ReporteNo reporte={reporte}/>
                   
                    <ReporteItemsTabla invoice={reporte} />
                 
                </Page>
            </Document>
        );
  
  export default ReportePDF;