import { BlocksControls } from 'react-tinacms-inline'
import { GridItem } from '@chakra-ui/layout'

interface Props {
  index: number
}

export const Form = ({ index }: Props) => {
  return (
    <GridItem key={index} gridColumn={'2 / 14'}>
      <BlocksControls index={index} insetControls label={false}>
        <form
          name="contact"
          method="post"
          action="/thanks/"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
        >
          {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
          <input type="hidden" name="form-name" value="contact" />
          <p hidden>
            <label>
              Don’t fill this out:
              <input name="bot-field"/>
            </label>
          </p>
          <p>
            <label>
              Your name:<br />
              <input type="text" name="name"/>
            </label>
          </p>
          <p>
            <label>
              Your email:<br />
              <input type="email" name="email"/>
            </label>
          </p>
          <p>
            <label>
              Message:<br />
              <textarea name="message"/>
            </label>
          </p>
          <p>
            <button type="submit">Send</button>
          </p>
        </form>
      </BlocksControls>
    </GridItem>
  )
}

export const FormTemplate = {
  label: 'Form',
  fields: [
  ]
}
