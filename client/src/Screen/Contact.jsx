import React from "react";
import { MdOutlineEmail } from "react-icons/md";
import { BiPhoneCall } from "react-icons/bi";
import { Link } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";
import Layout from "../Layout/Layout";
import Head from "../Components/Head";
const ContactData = [
  {
    id: 1,
    title: "Email",
    Icon: <MdOutlineEmail /> ,
    contact: "nguyenanh1997dz@gmail.com",
  },
  {
    id: 2,
    title: "Call",
    Icon: <BiPhoneCall /> ,
    contact: "0923055947",
  },
  {
    id: 3,
    title: "Location",
    Icon: <IoLocationOutline /> ,
    contact: "Ho Chi Minh City",
  },
];
const Contact = () => {
  return (
      <Layout>
        <div className="min-height-screen container mx-auto px-2 my-6">
          <Head title="Contact Us"></Head>
          <div className="grid mg:grid-cols-2 gap-6 lg:my-20 my-10 lg:grid-cols-3 xl:gap-8">
            {ContactData.map((item) => (
              <div key={item.id} className="border border-border flex-colo p-10 bg-dry rounded-lg text-center">
                <span className="flex-colo w-20 h-20 mb-4 rounded-full bg-main text-subMain text-2xl">
                {item.Icon}
                </span>
                <h5 className="text-xl font-semibold mb-2">{item.title}</h5>
                <p className="mb-0 text-sm text-text leading-7">
                  <Link to="#" className="text-blue-600">
                  {item.contact}  
                  </Link>
                  {item.info}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Layout>

  );
};

export default Contact;
