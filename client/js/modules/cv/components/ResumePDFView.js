import { useMemo, useCallback } from 'react';
import { Font, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

import skills from './data-points/skills';
import experience from './data-points/experience';

Font.register({
    family: 'Barlow',
    fonts: [
        {
            fontWeight: 600,
            fontStyle: 'normal',
            src: '/fonts/barlow/Barlow-SemiBold.ttf'
        },
        {
            fontWeight: 700,
            fontStyle: 'normal',
            src: '/fonts/barlow/Barlow-Bold.ttf'
        }, {
            fontWeight: 800,
            fontStyle: 'normal',
            src: '/fonts/barlow/Barlow-Black.ttf'
        }, {
            fontWeight: 400,
            fontStyle: 'normal',
            src: '/fonts/barlow/Barlow-Regular.ttf'
        }
    ]
});

// removes word-break/hyphonation behavior

Font.registerHyphenationCallback(word => [word]);

const createStyles = theme => StyleSheet.create({
    document: {
        backgroundColor: '#FFF',
        fontFamily: 'Barlow'
    },
    page: {
        flexDirection: 'row',
        padding: 0
    },
    panel: {
        paddingTop: '22pt',
        paddingBottom: '22pt'
    },
    rightPanel: {
        width: '69%',
        paddingLeft: '20pt',
        paddingRight: '20pt',
        color: '#000'
    },
    leftPanel: {
        width: '31%',
        paddingLeft: '20pt',
        paddingRight: '20pt',
        color: '#FFF',
        backgroundColor: '#000',
        borderRight: '1pt solid #000'
    },
    leftPanelText: {
        color: '#FFF'
    },
    header: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginBottom: '24pt',
        width: '96%',
        paddingBottom: '14pt',
        borderBottom: `10pt solid ${theme.palette.secondary.dark}`
    },
    name: {
        fontFamily: 'Barlow',
        fontWeight: 700,
        fontSize: '24pt',
        textTransform: 'uppercase',
        letterSpacing: '0',
        lineHeight: '1.4pt',
        textAlign: 'left',
        marginBottom: '2pt',
    },
    career: {
        fontFamily: 'Barlow',
        fontWeight: 700,
        fontSize: '13pt',
        textTransform: 'uppercase',
        letterSpacing: '0.32pt',
        textAlign: 'left',
        marginBottom: '2pt'
    },
    website: {
        fontFamily: 'Barlow',
        fontWeight: 400,
        fontSize: '12pt',
        textAlign: 'left'
    },
    educationLocation: {
        position: 'relative',
        paddingBottom: '8pt',
    },
    leftPanelEndPadding: {
        display: 'flex',
        width: '100%',
        height: '273pt'
    },
    contact: {
        display: 'flex',
        fontFamily: 'Barlow',
        fontWeight: 600,
        fontSize: '10pt',
        width: '100%',
        letterSpacing: '0pt',
        textAlign: 'left'
    },
    sectionMarginBottom: {
        marginBottom: '18pt'
    },
    sectionEntryBottomPadding: {
        marginBottom: '12pt'
    },
    sectionEntryBody: {
        display: 'flex',
        flexDirection: 'row',
        fontSize: '9pt'
    },
    sectionEntryTitle: {
        display: 'flex',
        flexDirection: 'row',
        color: theme.palette.secondary.dark
    },
    sectionTitleText: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Barlow',
        fontWeight: 700,
        fontSize: '10.5pt',
        letterSpacing: '1.25pt'
    },
    educationResult: {
        fontSize: '11pt',
        fontWeight: 700,
        fontFamily: 'Barlow',
        letterSpacing: '1.25pt',
        color: theme.palette.secondary.dark
    },
    sectionEntryContext: {
        fontFamily: 'Barlow',
        fontWeight: 400,
        fontSize: '11pt',
        letterSpacing: '1.25pt'
    },
    sectionEntrySubtitle: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: '4pt'
    },
    block: {
        display: 'block'
    },
    sectionTitle: {
        fontFamily: 'Barlow',
        fontWeight: 800,
        fontSize: '14pt',
        textTransform: 'uppercase',
        marginBottom: '8pt',
        letterSpacing: '1.36pt'
    },
    subtitleText: {
        fontFamily: 'Barlow',
        fontWeight: 600,
        fontSize: '10pt',
        marginRight: '4pt',
        letterSpacing: '1pt'
    },
    subtitleText2: {
        fontFamily: 'Barlow',
        fontWeight: 700,
        fontSize: '11pt',
        marginRight: '4pt',
        letterSpacing: '1.1pt'
    },
    sectionBodyP: {
        fontFamily: 'Barlow',
        fontWeight: 400,
        fontSize: '8pt',
        lineHeight: '1.24pt',
        letterSpacing: '0.4pt',
        textAlign: 'left'
    },
    sectionBodyPBottomPadding: {
        marginBottom: '6pt'
    },
    textLeftAlign: {
        textAlign: 'left'
    },
    technologyGroup: {
        display: 'block',
        fontFamily: 'Barlow',
        fontWeight: 600,
        fontSize: '11pt'
    },
    fullWidth: {
        width: '100%'
    },
    indent: {
    }
});

export default function ResumePDFView({ theme }) {
    const styles = useMemo(() => createStyles(theme), [theme]);

    const ResumeSkillsGroup = useCallback(({ name, items, isLast }) => (
        <View style={ !isLast ? styles.sectionEntryBottomPadding: undefined } key={ name }>
            <View style={ styles.sectionEntryTitle }>
                <Text style={ styles.sectionTitleText }>
                    { name }
                </Text>
            </View>
            <View style={{ ...styles.fullWidth, ...styles.indent }}>
                { items.map( (g, i) => (
                    <Text key={ `_${i+1}` } style={ styles.technologyGroup }>{
                        g.map((t, i) => (
                            <>
                                { t }{ (i < (g.length-1)) ?
                                    (<>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;</>) :
                                    undefined
                                }
                            </>
                        )) }
                    </Text>
                )) }
            </View>
        </View>
    ), [styles]);

    const ResumeExperienceEntry = useCallback(({
        title, context, workplace, dates, points, isLast
    }) => (
        <View style={ !isLast ? styles.sectionEntryBottomPadding: undefined }>
            <View style={ styles.sectionEntryTitle }>
                <Text style={ styles.sectionTitleText }>{ title } </Text>
                { !context ? undefined : (
                    <Text style={ styles.sectionEntryContext }>
                        &nbsp;({ context })
                    </Text>
                ) }
            </View>
            <View style={ styles.sectionEntrySubtitle }>
                <Text style={ styles.subtitleText }>
                    { workplace } / { dates }
                </Text>
            </View>
            <View stye={ styles.sectionEntryBody }>
                { !points ? undefined: points.map((p, i) => (
                    <Text
                        key={ `${i+1}` }
                        style={{
                        ...(i < (points.length - 1) ?
                            styles.sectionBodyPBottomPadding :
                            undefined
                        ),
                        ...styles.sectionBodyP
                    }}>{ p }
                    </Text>
                )) }
            </View>
        </View>
    ), [styles]);

    return (
        <Document style={ styles.document }>
            <Page size={ 'Letter' } style={ styles.page }>
                <View style={{ ...styles.leftPanel, ...styles.panel }}>
                    <View style={ styles.header }>
                        <Text style={ styles.name }>
                            Robert
                        </Text>
                        <Text style={ styles.name }>
                            Concepción
                        </Text>
                    </View>
                    <View style={{ ...styles.section, ...styles.sectionMarginBottom }}>
                        <Text style={ styles.sectionTitle }>Technologies</Text>
                        { skills.map( (section, i) => (
                            <ResumeSkillsGroup { ...section } key={ section.name } />
                        )) }
                    </View>
                    <View style={ styles.section }>
                        <Text style={ styles.sectionTitle }>
                            Education
                        </Text>
                        <View style={ styles.educationLocation }>
                            <Text style={ styles.subtitleText2 }>
                                New York Institute of Technology
                            </Text>
                        </View>
                        <View style={ styles.sectionEntry }>
                            <View style={ styles.sectionEntryTitle }>
                                <Text style={ styles.educationResult }>
                                    M.S. Computer Science
                                </Text>
                            </View>
                            <View style={ styles.sectionEntrySubtitle }>
                                <Text style={ styles.subtitleText }>
                                    December 2013
                                </Text>
                            </View>
                            <View style={ styles.sectionEntryTitle }>
                                <Text style={ styles.educationResult }>
                                    B.S. Computer Science
                                </Text>
                            </View>
                            <View style={ styles.sectionEntrySubtitle }>
                                <Text style={ styles.subtitleText }>
                                    August 2012
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={ styles.leftPanelEndPadding } />
                    <Text style={ styles.contact }>
                        robert.concepcion.iii@gmail.com
                    </Text>
                    <Text style={ styles.contact }>
                        Phone: (646) 719 - 3800
                    </Text>
                    <Text style={ styles.contact }>
                        https://robertconcepcion.com
                    </Text>
                </View>
                <View style={{ ...styles.rightPanel, ...styles.panel }}>
                    <View style={ styles.section }>
                        <View style={ styles.sectionBody }>
                            { experience.map((entry, i) => (
                                <ResumeExperienceEntry
                                    key={ `_${i+1}` }
                                    isLast={ i == (experience.length -1) }
                                    { ...entry }
                                />
                            )) }
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    );
}
