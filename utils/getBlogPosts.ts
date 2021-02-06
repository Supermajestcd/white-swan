import {
  getFiles as getGithubFiles,
  getGithubPreviewProps,
  parseMarkdown
} from 'next-tinacms-github'
import { getLocalFiles } from './getLocalFiles'

export default async (preview, previewData, contentDir) => {
  const fs = require('fs')
  const files = preview
    ? await getGithubFiles(
        contentDir,
        previewData.working_repo_full_name,
        previewData.head_branch,
        previewData.github_access_token
      )
    : await getLocalFiles(contentDir)
  const posts = await Promise.all(
    files.map(async (file) => {
      if (preview) {
        const previewProps = await getGithubPreviewProps({
          ...previewData,
          fileRelativePath: file,
          parse: parseMarkdown
        })
        return {
          fileName: file.replace('.json', '').replace(contentDir, '').replace('/', ''),
          fileRelativePath: file,
          data: previewProps.props.file?.data
        }
      }
      const content = fs.readFileSync(file)
      const data = JSON.parse(content)
      return {
        fileName: file.replace('.json', '').replace(contentDir, '').replace('/', ''),
        fileRelativePath: file,
        data
      }
    })
  )
  return posts.filter(({ data }) => data.publish)
    .sort((a, b) => {
      // @ts-ignore
      return new Date(b.data.date) - new Date(a.data.date)
    })
}
