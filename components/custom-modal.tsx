'use client';

import {
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Modal,
  ModalContent,
  Input,
  Checkbox,
  Link,
  Switch,
  CircularProgress,
} from '@nextui-org/react';

import { useState } from 'react';
import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CustomModalType, Todo } from '@/types';

// focusedTodo: aTodo,
// modalType: key as CustomModalType,

const CustomModal = ({
  focusedTodo,
  modalType,
  onClose,
  onEdit,
}: {
  focusedTodo: Todo;
  modalType: CustomModalType;
  onClose: () => void;
  onEdit: (id: string, title: string, isDone: boolean) => void;
}) => {
  // 수정된 선택
  const [isDone, setIsDone] = useState(focusedTodo.is_done);
  // 로딩 상태
  const [isLoading, setIsLoading] = useState(false);
  // 수정된 할일 입력
  const [editedTodoInput, setEditedTodoInput] = useState<string>(
    focusedTodo.title
  );

  const DetailModal = () => {
    return (
      <>
        <ModalHeader className='flex flex-col gap-1'>{modalType}</ModalHeader>
        <ModalBody>
          <p>상세 모달</p>
        </ModalBody>
        <ModalFooter>
          <Button color='danger' variant='light' onPress={onClose}>
            닫기
          </Button>
          <Button color='primary' onPress={onClose}>
            액션
          </Button>
        </ModalFooter>
      </>
    );
  };
  const EditModal = () => {
    return (
      <>
        <ModalHeader className='flex flex-col gap-1'>할일 수정</ModalHeader>
        <ModalBody>
          <p>
            <span className='font-bold'>id : </span>
            {focusedTodo.id}
          </p>
          <Input
            autoFocus
            label='할일 내용'
            placeholder='할일을 입력해주세요'
            variant='bordered'
            isRequired
            defaultValue={focusedTodo.title}
            value={editedTodoInput}
            onValueChange={setEditedTodoInput}
          />

          <div className='flex py-2  space-x-4'>
            <span className='font-bold'>완료여부 : </span>
            <Switch
              onValueChange={setIsDone}
              defaultSelected={focusedTodo.is_done}
              aria-label='Automatic updates'
              color='warning'
            ></Switch>
            {`${isDone ? '완료' : '미완료'}`}
          </div>
          <div className='flex py-1  space-x-4'>
            <span className='font-bold'>작성일 : </span>
            <p> {`${focusedTodo.created_at}`}</p>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color='warning'
            variant='flat'
            onPress={() => {
              onEdit(focusedTodo.id, editedTodoInput, isDone);
            }}
          >
            {isLoading ? (
              <CircularProgress
                size='sm'
                color='warning'
                aria-label='Loading'
              />
            ) : (
              '수정'
            )}
          </Button>
          <Button color='default' onPress={onClose}>
            닫기
          </Button>
        </ModalFooter>
      </>
    );
  };
  const DeleteModal = () => {
    return (
      <>
        <ModalHeader className='flex flex-col gap-1'>{modalType}</ModalHeader>
        <ModalBody>
          <p>삭제 모달</p>
        </ModalBody>
        <ModalFooter>
          <Button color='danger' variant='light' onPress={onClose}>
            닫기
          </Button>
          <Button color='primary' onPress={onClose}>
            액션
          </Button>
        </ModalFooter>
      </>
    );
  };

  const getModal = (type: CustomModalType) => {
    switch (type) {
      case 'detail':
        return DetailModal();
      case 'deleate':
        return DeleteModal();
      case 'update':
        return EditModal();
      default:
        break;
    }
  };

  return <>{getModal(modalType)}</>;
};

export default CustomModal;
