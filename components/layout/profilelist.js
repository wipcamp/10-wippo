import FontAwesomeIcon from  '@fortawesome/react-fontawesome'
import styled from 'styled-components'
import { icon } from '@fortawesome/fontawesome';

const Block = styled.div`
display: table;
table-layout: fixed;
width: 100%;
height: 100%;
text-decoration: none;
position: relative;
outline: none !important;
vertical-align: middle;
padding: 9px ;
`

const iconStyle = {
    color:'#95a5a6',
}

const mText = {
    paddingLeft:'8px',
}

const ProfileList = (props) =>(
    <Block>
        <FontAwesomeIcon style={iconStyle} icon={props.icon} />
        <span style={mText}>
            {props.children}
        </span>
    </Block>
)

export default ProfileList