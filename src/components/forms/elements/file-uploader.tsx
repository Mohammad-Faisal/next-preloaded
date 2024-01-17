'use client'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useFileDeleter, useFileUploader } from '@/data/hooks/useFileClient'
import { FolderClosed, XSquare } from 'lucide-react'

import React, { useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'

interface FileUploaderProps {
  form: any
  folder: string
  name: string
  label: string
}

const FileUploader: React.FC<FileUploaderProps> = ({ folder, name, label, form }) => {
  const { control } = useFormContext()

  const ref = useRef(null)

  const [file, setFile] = useState<File | undefined>(undefined)
  const [fileUrl, setFileUrl] = useState<string>('')
  const { loading: isUploadLoading, uploadFile } = useFileUploader(folder, name)
  const { loading: isDeleteLoading, deleteFile } = useFileDeleter(folder, name)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    setFile(file)

    if (file) {
      const objectUrl = await uploadFile(file)
      setFileUrl(objectUrl)
      form.setValue(name, objectUrl)
    }
  }

  const handleFileDelete = async () => {
    if (fileUrl && file) {
      const response = await deleteFile(file)
      setFile(undefined)
      setFileUrl('')
      form.setValue(name, '')
    }
  }

  const isLoading = isUploadLoading || isDeleteLoading

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="cursor-pointer">
          <FormLabel>{label}</FormLabel>
          <div className="flex cursor-pointer items-center gap-2">
            <FormControl>
              <Input ref={ref} id="file-upload" type="file" onChange={handleFileUpload} className="cursor-pointer" />
            </FormControl>
            {isLoading && (
              <div className="flex items-center justify-center">
                <div className="h-4 w-4 animate-spin rounded-full border-t-2 border-solid border-slate-600"></div>
              </div>
            )}
            {!isLoading && (
              <span className="cursor-pointer">
                {fileUrl ? (
                  <XSquare onClick={handleFileDelete} />
                ) : (
                  //@ts-ignore
                  <FolderClosed onClick={() => ref?.current?.click()} />
                )}
              </span>
            )}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default FileUploader
