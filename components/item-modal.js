import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import ItemForm from './item-form';

const ItemModal = ({ show, save, close, item }) => {
    const modalTitle = item?.name ? 'Modify an item' : 'Add an item';

    const saveItem = (itemData) => {
        save(itemData);
    }

    return (
        <Transition appear show={show} as={Fragment}>
            <Dialog as='div' className='fixed inset-0 z-10 overflow-y-auto' onClose={close}>
                <div className='min-h-screen px-4 text-center'>
                    <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'>
                        <Dialog.Overlay className='fixed inset-0' />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className='inline-block h-screen align-middle' aria-hidden='true'>
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0 scale-95'
                        enterTo='opacity-100 scale-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100 scale-100'
                        leaveTo='opacity-0 scale-95'>
                        <div className='inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-around rounded-2xl'>
                            <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900'>
                                {modalTitle}
                            </Dialog.Title>

                            <ItemForm save={saveItem} cancel={close} item={item} />
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
};

export default ItemModal;
