import { useRef, useCallback } from 'react';
import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';

interface ModalAddFoodProps {
  isOpen: boolean;
  handleAddFood: (food: Omit<FoodPlate, 'id' | 'available'>) => void;
  setIsOpen: () => void;
}

interface FoodPlate {
  id: number;
  name: string;
  image: string;
  price: string;
  description: string;
  available: boolean;
}

interface CreateFood {
  name: string;
  image: string;
  price: string;
  description: string;
}


export default function ModalAddFood({ isOpen, handleAddFood, setIsOpen }: ModalAddFoodProps) {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: CreateFood) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório'),
          image: Yup.string().required('Imagem é obrigatório'),
          price: Yup.string().required('Preço é obrigatório'),
          description: Yup.string().required('Descrição é obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        handleAddFood(data);

        setIsOpen();
      } catch (error) {
        console.log(error);
      }
    }, [handleAddFood, setIsOpen]
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};
