import React, { useMemo, useCallback } from 'react';
import { Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';

const experience = [{
    title : 'Lead UI Developer',
    context : 'Contract',
    company : `Nomura / Park Hudson Int'l`,
    points : [
        `Architected new modular Redux app structure which ` +
        `allowed for interchangeably picking features to ` +
        `include/deploy into several applications seamlessly, ` +
        `as well as a centralized panel application. ` +
        `Used this to deploy two applications into production ` +
        `which facilitated billions in equities trading and ` +
        `also eliminated tech debt from a previous application ` +
        `which was handed down to the team.`,

        `Designed and developed a streamlined React grid library ` +
        `which exceeded the performance, flexibility, visuals ` +
        `of another enterprise library several teams were paying ` +
        `$1200/yr/dev for -- this library became the standard ` +
        `for front-end initiatives on the team.`,

        `Assisted members from two other departments with ` +
        `issues related to front-end development when possible.`
    ]
}, {
    title : 'Software Engineer',
    context : 'Contract',
    company : 'RSG Media',
    points : []
}, {
    title : 'Front End Software Developer',
    company : 'YouVisit',
    points : []
}, {
    title : 'Senior Web Application Developer',
    company : 'Power Management Concepts',
    points : []
}, {
    title : 'Graduate Student/Software Developer',
    company : 'N.Y.I.T. (Thesis Project)',
    points : []
}, {
    title : 'Founder/Software Developer',
    company : 'Whateversoft (Sole Proprietorship)',
    points : []
}, {
    title : 'Information Management Officer',
    company : 'US Navy / Camp Arifjan, Kuwait',
    points : []
}, {
    title : 'Electronic Technician',
    company : 'US Navy',
    points : []
}];

const createStyles = theme => StyleSheet.create({
    document : {
        backgroundColor : '#FFF',
        fontFamily : 'Montserrat'
    },
    page : {
        flexDirection : 'column',
        padding : 36
    },
    header : {
        display : 'flex',
        justifyContent : 'center',
        alignItems : 'center',
        marginBottom : 36
    },
    name : {
        fontWeight : 700,
        textTransform : 'uppercase'
    },
    website : {

    },
    contact : {
        fontSize : '10pt'
    },
    body : {
        display : 'flex',
        flexGrow : 1
    },
    section : {
        marginBottom : '0.4in'
    },
    sectionTitle : {
        display : 'flex',
        flexDirection : 'row',
        color : theme.palette.secondary.dark
    },
    sectionTitleText : {
        fontWeight : 700
    },
    sectionBody : {
        display : 'flex',
        flexDirection : 'column'
    },
    experiencePoint : {
        marginBottom : 18
    }
});

export default function ResumePDFView({ theme }) {
    const styles = useMemo(() => createStyles(theme), [theme]);

    const ResumeExperienceEntry = useCallback(({
        title, context, company, dates, points
    }) => (
        <View style={ styles.section }>
            <View style={ styles.sectionTitle }>
                <Text style={ styles.sectionTitleText }>{ title } </Text>
                { !context ? undefined : (<Text>({ context })</Text>) }
            </View>
            <View stye={ styles.sectionBody }>
                { !points ? undefined : points.map( p => (
                    <Text style={ styles.experiencePoint }>{ p }</Text>
                )) }
            </View>
        </View>
    ), [styles]);

    return (
        <Document style={ styles.document }>
            <Page size={ 'A4' } style={ styles.page }>
                <View style={ styles.header }>
                    <Text style={ styles.name }>
                        Robert Concepción III
                    </Text>
                    <Text style={ styles.website }>
                        https://www.robertconcepcion.com
                    </Text>
                    <Text style={ styles.contact }>
                        (646) 719 - 3800 • robert.concepcion.iii@gmail.com
                    </Text>
                </View>
                <View style={ styles.body }>
                    { experience.map( entry => (
                        <ResumeExperienceEntry { ...entry } />
                    )) }
                </View>
            </Page>
        </Document>
    );
}
