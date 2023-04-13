import { useMemo, useCallback } from 'react';
import { Font, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

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

const experience = [
    {
        title: 'Web UI Engineer',
        context: 'Full Time',
        workplace: 'Lab 49 @ Ion Group',
        dates: 'September 2021 - April 2023',
        points: [
            'Worked for a large enterprise client to deliver a next gen suite of apps running Angular + Springboot',

            'Architected front-end for a customer data sourcing application and helped maintain standards within ' +
            'an Agile/Scrum environment',

            'Proactively worked with backend client facing systems and APIs and helped with Dev Ops to accomplish work',

            'Provided training to client developers and helped see through MVP releases with post-prod support.'
        ]
    },
    {
        title: 'Software Engineer',
        context: 'Contract',
        workplace: 'Infor / Motion Recruitment',
        dates: 'March 2021 - September 2021',
        points: [
            'Contributed to a greenfield open source enterprise UI framework ' +
            'as it migrates towards using framework-agnostic/forward-facing native ' +
            'Web Components. ',

            'Wrote unit tests and integration tests and created new components with 100% code coverage.',

            'Proposed ideas leveraged and actively participated in the streamlining of the architecture.',

            'Assisted with maintaining legacy component framework, solving bug tickets and migrating new features ' +
            'for components in development.'
        ]
    },
    {
        title: 'UI Developer',
        context: 'Consultant',
        workplace: `Chekhub`,
        dates: 'November 2020 - February 2021',
        points: [
            'Streamlined a ticket assignment and asset-mapping app by introducing font ' +
        'standardization, palette normalization, modeling asset ' +
        'relationships more inutitively, and fuzzy filtering content ' +
        'along several modules purely via client code.',

            'Created a 60fps Google Maps ticket browsing and assignment UI ' +
            'for dynamic filtering. Included ' +
        'drag-n-drop of items, panning, browsing, searching within, or assigning ' +
        'tickets to technicians and clustered items and annotating data in-view in real time.'
        ]
    }, {
        title: 'Frontend Engineer',
        workplace: `Greystone & Co`,
        dates: 'October 2019 - October 2020',
        points: [
            'Developed a greenfield clientside app faciliating borrowers to work through deals ' +
            'and manage documents while setting standards in codebase, mentoring/training of up and coming front-end devs.',
            `Assisted with setting up CI/CD and architected the integration test pipeline.`
        ]
    }, {
        title: 'Lead UI Developer',
        context: 'Contract',
        workplace: `Nomura`,
        dates: 'February 2019 - September 2019',
        points: [
            `Designed a front-end build system to interchangeably deploy modules ` +
        'within a new suite of apps for an initiative facilitating billions in ' +
        'equities trading monthly, and deployed two apps to production.',

            `Created an in-house grid library rendering 100ks ` +
        `of rows without pagination, updating real-time via sockets.`,
        ]
    }, {
        title: 'Software Engineer',
        context: 'Contract',
        workplace: 'RSG Media',
        dates: 'November 2017 - August 2018',
        points: [
            'Wrote a flagship RESTful API backend (RightsLogic) using NodeJS and MongoDB, and AWS Lamda ' +
        'microservices API and S3 to lookup IP rights globally in real-time ' +
        '-- under budget and on schedule.',

            'Auto-generated API doc for front-end to reference as spec evolved.',

            'Assisted with data migration scripts, as well as deployment dev ops as needed.'
        ]
    }, {
        title: 'Fullstack Engineer',
        workplace: 'YouVisit',
        dates: 'April 2017 - October 2017',
        points: [
            'Led an optimization/refactoring effort for a ' +
        'client side VR tour app. Improvements introduced: ' +
        'optimizing style system, adopting functional components, ' +
        'simplfying form/modal logic, removing circular dependencies, ' +
        'and streamlining async state management',

            'Implemented several features and fixed long-standing blockers.'
        ]
    }, {
        title: 'Senior Web Application Developer',
        workplace: 'PMC Technology',
        dates: 'April 2014 - March 2017',
        points: [
            'Designed the backend, database and UI for a CMS app facilitating ' +
            'upkeep of critical infra used in power systems and facility ' +
        'mappings in skyscrapers using NodeJS, Flux (FB) and MySQL.' +
        'Clients acquired relying on this included BlackRock, NYSE, ' +
        'WTC One and JFK Airport.',

            'Designed, iterated, and implemented on UI mockups for misc projects such as an expo website.',
            ' ',
            ' ',
        ]
    }, {
        title: 'Founder/Software Developer',
        workplace: 'Whateversoft',
        dates: 'January 2011 - May 2013',
        points: [
            'Worked with an artist to launch a real-time interactive puzzle ' +
        'game and a card game for the Android OS publicly including both native apps' +
        ' and server-side for high scores running at 60fps on a custom game engine. '
        ]
    }, {
        title: 'Information Management Officer',
        workplace: 'US Navy (Deployment)',
        dates: 'June 2009 - April 2010',
        points: [
            'Contributed to the design, development and management of a command-wide Sharepoint ' +
        'portal using HTML/CSS/JS.'
        ]
    }];

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

const skills = [{
    name: 'Engineering',
    items: [[
        'ES 5/6/7+',
        'TypeScript'
    ], [
        'React',
        'Rxjs',
        'Angular',
    ],
    [
        'Redux',
        'NgRX',
        'HTML5'
    ],
    [
        'Node',
        'Webpack',
        'Mongo'
    ],
    [
        'CircleCI',
        'Jenkins',
        'MySQL',
    ],
    [
        'Git',
        'Puppeteer',
        'Java'
    ],
    [
        'CSS',
        'Android SDK',
    ]],
},
{
    name: 'Multimedia',
    items: [[
        'Photoshop',
        'Krita',
    ],[

        'Resolve',
        'Blender3D',
    ]]
}];

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
