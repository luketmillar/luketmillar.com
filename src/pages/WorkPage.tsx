import styled from 'styled-components'
import { SidebarHidden } from '../breakpoints'

const Container = styled.div`
    min-height: 100vh;
    min-height: 100dvh;
    padding: 48px clamp(32px, 6vw, 80px);

    ${SidebarHidden} {
        padding-top: 80px;
    }
`

const Title = styled.h1`
    font-size: clamp(1.1rem, 2.2vw, 1.5rem);
    font-weight: 400;
    color: var(--text-secondary);
    margin-bottom: clamp(24px, 4vw, 40px);
`

const List = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 640px;
`

const Item = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 20px;
    padding: 28px 0;
    border-bottom: 1px solid var(--border);

    &:first-child {
        padding-top: 0;
    }
`

const Logo = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 10px;
    overflow: hidden;
    flex-shrink: 0;
    margin-top: 2px;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`

const Info = styled.div`
    flex: 1;
    min-width: 0;
`

const Company = styled.h3`
    font-size: 1.1rem;
    font-weight: 700;
    margin: 0;
    color: var(--text);
`

const Role = styled.div`
    font-size: 0.85rem;
    color: var(--text-secondary);
    margin-top: 2px;
`

const Years = styled.div`
    font-size: 0.8rem;
    color: var(--text-tertiary);
    margin-top: 8px;
`

const Description = styled.p`
    font-size: 0.9rem;
    line-height: 1.6;
    color: var(--text-secondary);
    margin: 8px 0 0;
`

const jobs = [
    {
        company: 'Medium',
        role: 'SVP of Product & Engineering',
        years: '2021\u20132025',
        description: 'Led Engineering and Product through a turnaround. Rebuilt the org, refocused execution, and helped drive the company to profitability.',
        logo: '/logos/medium.png',
    },
    {
        company: 'Projector',
        role: 'VP of Engineering & Software Engineer',
        years: '2017\u20132021',
        description: 'Co-founded and built v1 of a web-based graphics engine and authoring product. WebGL, React, Go, Node.',
        logo: '/logos/projector.png',
    },
    {
        company: 'Shift Technologies',
        role: 'Engineering Manager',
        years: '2016\u20132017',
        description: 'Built and launched the v1 iOS app as an IC. Managed the product engineering team building the user-facing buying and selling experiences.',
        logo: '/logos/shift.png',
    },
    {
        company: 'Twitter',
        role: 'Engineering Manager & Staff Engineer',
        years: '2012\u20132016',
        description: 'Founded the Direct Messages team and rebuilt DMs as real-time group messaging. Engineering Manager across iOS, Android, and Web.',
        logo: '/logos/twitter.png',
    },
    {
        company: 'Microsoft',
        role: 'Software Engineer II',
        years: '2009\u20132012',
        description: 'Built user-facing features in OneDrive including the core file browser and in-product sharing.',
        logo: '/logos/microsoft.png',
    },
]

const WorkPage = () => {
    return (
        <Container>
            <Title>Work history</Title>
            <List>
                {jobs.map((job) => (
                    <Item key={job.company}>
                        <Logo>
                            <img src={job.logo} alt={job.company} />
                        </Logo>
                        <Info>
                            <Company>{job.company}</Company>
                            <Role>{job.role}</Role>
                            <Years>{job.years}</Years>
                            <Description>{job.description}</Description>
                        </Info>
                    </Item>
                ))}
            </List>
        </Container>
    )
}

export default WorkPage
