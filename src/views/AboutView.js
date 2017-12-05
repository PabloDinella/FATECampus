import React from 'react'
import {TopBar} from '../components'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import SvgIcon from 'material-ui/SvgIcon'
import LinkIcon from 'material-ui-icons/Link'

const AboutView = ({toggleMenu}) => {
  return <div>
    <TopBar toggleMenu={toggleMenu} />
    <div style={{padding: 20}}>
      <Typography type="display1" gutterBottom>Sobre</Typography>
      <Typography type="body1" gutterBottom paragraph>
        Este Progressive Web App foi desenvolvido como parte de um TCC para a FATEC-SP. Tem como objetivo explorar novas tecnologias como ReactJS, service workers e ECMAScript 6.
      </Typography>
      <Typography type="title" gutterBottom>Código</Typography>
      <Typography type="body1" gutterBottom paragraph>
        A versão mais recente do código deste app pode ser encontrado no <a href="https://github.com/PabloDinella/FATECampus" target="_blank">GitHub</a>. Licença MIT.
      </Typography>
      <Typography type="title" gutterBottom>Autor</Typography>
      <Typography type="body1" gutterBottom paragraph>
        Pablo R. Dinella
      </Typography>
      <Typography type="body1" gutterBottom paragraph>
        <a href="//pablodinella.com/" target="_blank">pablodinella.com</a>
        <br/>
        <a href="//github.com/pablodinella" target="_blank">github.com/pablodinella</a>
      </Typography>
    </div>
  </div>
}

export default AboutView
