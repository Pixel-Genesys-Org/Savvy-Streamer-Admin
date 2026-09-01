import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'
import DetailsPage from "../../../components/Wrappers/DetailsPage"
import Dropdown from "../../../components/Dropdown"
import Input from '../../../components/Input'
import Button from '../../../components/Button'
import { useGetContentQuery, useUpdateContentMutation } from "../../../redux/apis/Content"
import "./index.css"
import Loader from '../../../components/Loader'

const modules = {
    toolbar: [
        [{ header: [2, 3, false] }],
        ['bold', 'italic', 'underline'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link'],
        ['clean'],
    ],
}

const formats = [
    'header',
    'bold', 'italic', 'underline',
    'list', 'bullet',
    'link',
]

const CONTENT_TYPE_OPTIONS = [
    { label: 'About Us', value: 'about-us' },
    { label: 'Privacy Policy', value: 'privacy-policy' },
    { label: 'Terms and Conditions', value: 'terms-and-conditions' },
]

const ManageContent = () => {

    const [is_edit, setIsEdit] = useState(false)

    const [submit, { isLoading, isSuccess }] = useUpdateContentMutation()

    const {
        control,
        handleSubmit,
        watch,
        reset,
        setValue,
        formState: { errors }
    } = useForm({
        defaultValues: {
            type: CONTENT_TYPE_OPTIONS[0],
            title: '',
            body: ''
        }
    })

    const body = watch('body')
    const type = watch('type')

    const { data, isFetching: isDataLoading, isSuccess: isDataSuccess, isError: isDataError } = useGetContentQuery(type?.value, { skip: !type })

    useEffect(() => {
        if (isSuccess) {
            setIsEdit(false)
        }
    }, [isSuccess])

    useEffect(() => {
        if (isDataError) {
            setIsEdit(true)
            setValue("title", "")
            setValue("body", "")
        }
    }, [isDataError])

    useEffect(() => {
        if (isDataSuccess) {
            setValue("title", data?.data?.title)
            setValue("body", data?.data?.body)
        }
    }, [isDataSuccess, data])

    const onTypeChange = (option, field_on_change) => {
        setIsEdit(false)
        field_on_change(option)
    }

    const onSubmit = (data) => {
        submit({
            ...data,
            type: data?.type?.value
        })
    }

    const onCancel = () => {
        setIsEdit(false)
        setValue("title", data?.data?.title)
        setValue("body", data?.data?.body)
    }

    return (
        <DetailsPage title={"Content Management"} back={false}>
            <div className='grid gap-4'>

                <div className="grid grid-cols-3 gap-4">
                    <Controller
                        name="type"
                        control={control}
                        rules={{ required: "Content type is required" }}
                        render={({ field }) => (
                            <Dropdown
                                label="Content Type"
                                placeholder="Select Content Type"
                                options={CONTENT_TYPE_OPTIONS}
                                value={field.value}
                                onChange={(option) => onTypeChange(option, field.onChange)}
                                error={errors.type?.message}
                                required
                            />
                        )}
                    />
                </div>
                {
                    isDataLoading ? <Loader center size={40} /> : (
                        <>

                            <Controller
                                name="title"
                                control={control}
                                rules={{ required: "Title is required" }}
                                render={({ field }) => (
                                    <Input
                                        required
                                        label={"Title"}
                                        value={field.value}
                                        onChange={field.onChange}
                                        placeholder="Enter title"
                                        error={errors.title?.message}
                                        disabled={!is_edit}
                                    />
                                )}
                            />

                            <div>
                                <label className="text-sm font-medium text-secondary px-3 mb-1">
                                    Content <span className="text-red-500">*</span>
                                </label>
                                {
                                    is_edit ? (
                                        <Controller
                                            name="body"
                                            control={control}
                                            rules={{ required: "Content is required" }}
                                            render={({ field }) => (
                                                <ReactQuill
                                                    theme="snow"
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    modules={modules}
                                                    formats={formats}
                                                    className="quill-editor"
                                                />
                                            )}
                                        />
                                    ) : (
                                        body ? (
                                            <div
                                                className="prose max-w-none px-3 py-2 border border-gray-300 rounded-md"
                                                dangerouslySetInnerHTML={{ __html: body }}
                                            />
                                        ) : (
                                            <div className="px-3 py-2">
                                                <p className='text-sm'>No content available. Please switch to edit mode to add content.</p>
                                            </div>
                                        )
                                    )
                                }
                            </div>

                            <div className='grid grid-cols-8 gap-4'>
                                {
                                    is_edit ? (
                                        <>
                                            <Button type='secondary' text="Cancel" onClick={onCancel} className="mr-2" />
                                            <Button text="Save" loading={isLoading} onClick={handleSubmit(onSubmit)} />
                                        </>
                                    ) : (
                                        <Button onClick={() => setIsEdit(true)} text="Edit" />
                                    )}
                            </div>
                        </>
                    )
                }
            </div>
        </DetailsPage>
    )

}

export default ManageContent