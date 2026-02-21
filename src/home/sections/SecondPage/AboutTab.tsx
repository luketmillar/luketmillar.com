import styled from 'styled-components'
import { WidescreenSelect } from '../../utils'
import Colors from '../../../colors'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    max-width: 1000px;
    width: 100%;

    ${WidescreenSelect} {
        flex-direction: row;
        align-items: center;
        gap: 60px;
    }
`

const PhotoWrapper = styled.div`
    flex-shrink: 0;
    width: 140px;
    height: 140px;
    border-radius: 50%;
    overflow: hidden;
    border: 3px solid ${Colors.aqua};

    ${WidescreenSelect} {
        width: 280px;
        height: 280px;
    }
`

const Photo = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`

const TextBlock = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    text-align: center;

    ${WidescreenSelect} {
        text-align: left;
        gap: 14px;
    }
`

const Bio = styled.p`
    font-size: 0.9rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.85);
    margin: 0;

    ${WidescreenSelect} {
        font-size: 1.05rem;
        line-height: 1.7;
    }
`

const AboutTab = () => {
    return (
        <Wrapper>
            <PhotoWrapper>
                <Photo src="/me.jpg" alt="Luke Millar" />
            </PhotoWrapper>
            <TextBlock>
                <Bio>
                    Hey, I'm Luke. Engineering leader, builder, dad of five. Born and raised in Northern California.
                </Bio>
                <Bio>
                    I love making things. Coding feels like pure creation. Take an idea and turn it into something real. I'm always working on some side project.
                </Bio>
                <Bio>
                    Die-hard Kings fan (I love suffering). Big into boating in the summer, game nights with friends, and hosting a podcast called Taste Buds where we eat and review foods.
                </Bio>
                <Bio>
                    Mario Kart World expert (I have almost all the house records). Claim to fame: #52 in Link's Awakening world record speed runs.
                </Bio>
                <Bio>
                    Huge fan of Back to the Future, Lost, Mission Impossible, and everything Idris Elba does.
                </Bio>
            </TextBlock>
        </Wrapper>
    )
}

export default AboutTab
