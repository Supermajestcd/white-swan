// import { BlocksControls } from 'react-tinacms-inline'
import { useHubspotForm } from '@aaronhayes/react-use-hubspot-form'
import { GridItem } from '@chakra-ui/layout'
// import { FormControl, FormLabel, Input, Textarea, Button } from '@chakra-ui/react'

interface Props {
  index: number
}

export const Form = ({ index }: Props) => {
  const portalId = '4905990'
  const formId = '316b958f-2269-41f2-9a7d-c5b8dbebf07e'

  useHubspotForm({
    portalId,
    formId,
    target: '#hubspotSocialDiv'
  })

  return (
    <GridItem key={index} gridColumn={'5/span 6'}>
      <div><div id="hubspotSocialDiv" style={{ padding: '2.5em', paddingTop: '0' }} /></div>
      {/* <BlocksControls index={index} insetControls label={false}> */}
      {/*  <form */}
      {/*    name="contact" */}
      {/*    method="post" */}
      {/*    action="/contact-thank-you/" */}
      {/*    data-netlify="true" */}
      {/*    data-netlify-honeypot="bot-field" */}
      {/*  > */}
      {/*    /!* The `form-name` hidden field is required to support form submissions without JavaScript *!/ */}
      {/*    <input type="hidden" name="form-name" value="contact" /> */}
      {/*    <p hidden> */}
      {/*      <label> */}
      {/*        Don’t fill this out: */}
      {/*        <input name="bot-field"/> */}
      {/*      </label> */}
      {/*    </p> */}
      {/*    <FormControl id="name" p={'3'}> */}
      {/*      <FormLabel>Name EDIT</FormLabel> */}
      {/*      <Input type="text" name="name" required/> */}
      {/*    </FormControl> */}
      {/*    <FormControl id="email" p={'3'}> */}
      {/*      <FormLabel>Email</FormLabel> */}
      {/*      <Input type="email" name="email" required/> */}
      {/*    </FormControl> */}
      {/*    <FormControl id="comment" p={'3'}> */}
      {/*      <FormLabel>Comment</FormLabel> */}
      {/*      <Textarea type="comment" name="comment" required/> */}
      {/*    </FormControl> */}
      {/*    <Button type="submit" m={'3'}>Send</Button> */}
      {/*  </form> */}
      {/* </BlocksControls> */}
    </GridItem>
  )
}

export const FormTemplate = {
  label: 'Form',
  fields: [
  ]
}
