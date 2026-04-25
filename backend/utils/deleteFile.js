import path from 'path'
import fs from 'fs'

export const deleteFile = (filePath) => {
  if (!filePath) return

  const fullPath = path.join(
    process.cwd(),
    filePath.startsWith('/') ? filePath.slice(1) : filePath
  )

  if (fs.existsSync(fullPath)) {
    fs.unlink(fullPath, (error) => {
      if (error) console.log(`Error deleting file: ${error.message}`)
      else console.log(`Deleted this file: ${fullPath}`)
    })
  }
}