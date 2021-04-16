import { BlocksControls } from 'react-tinacms-inline'
import { GridItem } from '@chakra-ui/layout'

interface Props {
  index: number
  data: {
    videoLink: string;
    posterImageName: string;
  }
}

export const Video = ({ index, data }: Props) => {
  return (
    <GridItem key={index} gridColumn={'2 / 14'}>
      <BlocksControls index={index} insetControls label={false}>
          <video controls style={{ margin: '30px auto' }} poster={`/${data.posterImageName}`}>
            <source src={`/${data.videoLink}`} type='video/mp4'/>
          </video>
      </BlocksControls>
    </GridItem>
  )
}

export const VideoTemplate = {
  label: 'Video',
  fields: [
    {
      component: 'text',
      name: 'videoLink',
      label: 'Video filename which has been added to the media Manager'
    },
    {
      component: 'text',
      name: 'posterImageName',
      label: 'The title of the uploaded image to be used as the video poster image'
    }
  ]
}
