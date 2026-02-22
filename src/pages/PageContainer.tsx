import styled from 'styled-components'
import { SidebarHidden } from '../breakpoints'

const PageContainer = styled.div`
    max-width: 720px;
    margin: 0 auto;
    padding: 48px 24px;

    ${SidebarHidden} {
        padding-top: 80px;
    }
`

export default PageContainer
