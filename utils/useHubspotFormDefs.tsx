import { useRef } from 'react'
import { useHubspotForm } from '@aaronhayes/react-use-hubspot-form'

export const generateForm = (filename: string) => {
  const formDefs = useRef({
    'accelerating-diagnosis-hypertrophic-cardiomyopathy.json': { portalId: '4905990', formId: 'd182c3d0-f644-4d80-867f-57c29e3b3c94' },
    'disease-progression-predictors.json': { portalId: '4905990', formId: '3995f2cd-d1d7-436e-ae98-c28077896709' },
    'worry-and-rumination-social-analysis.json': { portalId: '4905990', formId: 'cd8eb637-39aa-4c20-ba2d-0ecd6e0f8750' },
    'improving-diagnosis-and-treatment-for-back-pain.json': { portalId: '4905990', formId: '52422817-36fb-4841-806d-3240509a7576' },
    'supporting-parkinsons-sufferers.json': { portalId: '4905990', formId: '4a862623-4411-45b6-9ef5-0a5980dc2703' },
    'analysing-fibromyalgia-needs.json': { portalId: '4905990', formId: 'bbabac64-a984-48dc-ab23-266ef7f332e8' }
    // 'contact.json': { portalId: '4905990', formId: '316b958f-2269-41f2-9a7d-c5b8dbebf07e' }
  })

  if (formDefs.current[filename]) {
    const { portalId, formId } = formDefs.current[filename]
    useHubspotForm({
      portalId,
      formId,
      target: '#hubspotDiv'
    })
  }
}
