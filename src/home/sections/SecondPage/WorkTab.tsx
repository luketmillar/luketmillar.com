import React from 'react'
import styled from 'styled-components'
import { WidescreenSelect } from '../../utils'

const Wrapper = styled.div`
    max-width: 900px;
    width: 100%;
`

const Grid = styled.div`
    display: flex;
    flex-direction: column;
    gap: 14px;

    ${WidescreenSelect} {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 24px;
    }
`

const Card = styled.div`
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 18px;
    background: rgba(255, 255, 255, 0.03);

    ${WidescreenSelect} {
        padding: 28px;
    }
`

const CardHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 8px;

    ${WidescreenSelect} {
        gap: 14px;
        margin-bottom: 12px;
    }
`

const Logo = styled.div`
    width: 32px;
    height: 32px;
    border-radius: 6px;
    overflow: hidden;
    flex-shrink: 0;

    ${WidescreenSelect} {
        width: 40px;
        height: 40px;
        border-radius: 8px;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`

const HeaderText = styled.div`
    min-width: 0;
`

const Company = styled.h3`
    font-size: 1rem;
    font-weight: 700;
    margin: 0;
    color: white;

    ${WidescreenSelect} {
        font-size: 1.2rem;
    }
`

const Role = styled.div`
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.5);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    ${WidescreenSelect} {
        font-size: 0.85rem;
    }
`

const Years = styled.div`
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.35);
    margin-bottom: 8px;

    ${WidescreenSelect} {
        font-size: 0.8rem;
        margin-bottom: 12px;
    }
`

const Description = styled.p`
    font-size: 0.85rem;
    line-height: 1.5;
    color: rgba(255, 255, 255, 0.7);
    margin: 0;

    ${WidescreenSelect} {
        font-size: 0.95rem;
        line-height: 1.6;
    }
`

const jobs = [
    {
        company: 'Medium',
        role: 'SVP of Product & Engineering',
        years: '2021–2025',
        description: 'Led Engineering and Product through a turnaround. Rebuilt the org, refocused execution, and helped drive the company to profitability.',
        logo: '/logos/medium.png',
    },
    {
        company: 'Projector',
        role: 'VP of Engineering & Software Engineer',
        years: '2017–2021',
        description: 'Co-founded and built v1 of a web-based graphics engine and authoring product. WebGL, React, Go, Node.',
        logo: '/logos/projector.png',
    },
    {
        company: 'Shift Technologies',
        role: 'Engineering Manager',
        years: '2016–2017',
        description: 'Built and launched the v1 iOS app as an IC. Managed the product engineering team building the user-facing buying and selling experiences.',
        logo: '/logos/shift.png',
    },
    {
        company: 'Twitter',
        role: 'Engineering Manager & Staff Engineer',
        years: '2012–2016',
        description: 'Founded the Direct Messages team and rebuilt DMs as real-time group messaging. Engineering Manager across iOS, Android, and Web.',
        logo: '/logos/twitter.png',
    },
    {
        company: 'Microsoft',
        role: 'Software Engineer II',
        years: '2009–2012',
        description: 'Built user-facing features in OneDrive including the core file browser and in-product sharing.',
        logo: '/logos/microsoft.png',
    },
]

const WorkTab = () => {
    return (
        <Wrapper>
            <Grid>
                {jobs.map((job) => (
                    <Card key={job.company}>
                        <CardHeader>
                            <Logo>
                                <img src={job.logo} alt={job.company} />
                            </Logo>
                            <HeaderText>
                                <Company>{job.company}</Company>
                                <Role>{job.role}</Role>
                            </HeaderText>
                        </CardHeader>
                        <Years>{job.years}</Years>
                        <Description>{job.description}</Description>
                    </Card>
                ))}
            </Grid>
        </Wrapper>
    )
}

export default WorkTab
