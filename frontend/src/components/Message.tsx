import React from "react";
import { FaUser } from "react-icons/fa";

function Message() {
  return (
    <div>
      <div className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col gap-4">
        <div className="flex items-center mb-2">
          <FaUser className="text-gray-500 mr-2" size={20} />
          <p className="font-semibold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Accusantium, velit?
          </p>
        </div>
        <div className="p-4 bg-gray-200 rounded-lg shadow-sm">
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia
            corrupti, ex omnis voluptatibus nam modi reprehenderit eaque ipsa
            dolorum quae temporibus minus esse dolores porro magnam dicta
            excepturi sit quo nihil suscipit distinctio possimus iusto.
            Temporibus fugit, labore veritatis, eos nostrum iusto, aliquid
            aliquam tenetur cupiditate perspiciatis ad! Soluta quisquam quis
            cumque sequi voluptas voluptates, pariatur, magnam, dolor odio sunt
            veritatis perferendis dolorem illo excepturi cupiditate fuga
            expedita accusamus? Amet veritatis ipsa maiores placeat nobis
            aliquid praesentium eligendi temporibus quae! Velit, voluptate
            ducimus nam dolore nostrum quam sint minus reprehenderit ab, harum
            quo accusantium similique ipsum temporibus natus impedit provident?
          </p>
        </div>
      </div>
    </div>
  );
}

export default Message;
