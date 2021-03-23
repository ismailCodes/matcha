import { Form, Input, Modal, Select, Tag } from 'antd';
import { Option } from 'antd/lib/mentions';
import PicturesWall from './PicturesWall';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 24 },
};

const options = [
  { value: 'gold' },
  { value: 'lime' },
  { value: 'green' },
  { value: 'cyan' },
  { value: 'red' },
  { value: 'yellow' },
];

function tagRender(props) {
  const { label, value, closable, onClose } = props;

  return (
    <Tag
      color={value}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3 }}
    >
      {label}
    </Tag>
  );
}

function EditProfileModal({ isModalVisible, handleOk, handleCancel }) {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Modal
        title='Edit Profile'
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText='Save'
        width={416}
        centered
      >
        <Form
          {...layout}
          name='basic'
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item>
            <PicturesWall />
          </Form.Item>

          <Form.Item name='firstName'>
            <Input placeholder='First Name' />
          </Form.Item>

          <Form.Item name='lastName'>
            <Input placeholder='Last Name' />
          </Form.Item>

          <Form.Item name='gender'>
            <Select placeholder='Gender'>
              <Option value='M'>Male</Option>
              <Option value='F'>Female</Option>
            </Select>
          </Form.Item>

          <Form.Item name='sexuality'>
            <Select placeholder='I prefer..'>
              <Option value='M'>Males</Option>
              <Option value='F'>Females</Option>
              <Option value='F'>Both</Option>
            </Select>
          </Form.Item>

          <Form.Item name='tags'>
            <Select
              mode='multiple'
              showArrow
              tagRender={tagRender}
              style={{ width: '100%' }}
              options={options}
              allowClear={true}
              maxTagCount={5}
              placeholder='Tags'
              showSearch={true}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default EditProfileModal;
