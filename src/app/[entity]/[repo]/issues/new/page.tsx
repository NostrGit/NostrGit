"use client";

import {
  validateEvent,
  verifySignature,
  signEvent,
  getEventHash,
  getPublicKey
} from 'nostr-tools'

import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import useSession from "@/lib/nostr/useSession";

import {
  useCallback,
  useRef,
  useState
} from "react";

import { Input } from "@/components/ui/input";

import { useRouter } from "next/navigation";
import { Check, ChevronDown, Edit, Settings } from 'lucide-react';
import { TextArea } from '@/components/ui/textarea';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';

export default function RepoIssueNewPage() {
  const router = useRouter();
  const titleRef = useRef<HTMLInputElement>(null);
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const assigneesFilterRef = useRef<HTMLInputElement>(null);
  const labelsFilterRef = useRef<HTMLInputElement>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const { picture, initials, isLoggedIn } = useSession();

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // todo: check the correct localstorage key for nsec
      let privateKey = localStorage.getItem('nostr:privkey')

      if (!isLoggedIn || !privateKey) {
        setErrorMsg('Sign in with your private key to create issues.')
        setTimeout(() => {
          setErrorMsg('')
        }, 6000)
        return
      }

      let event = {
        kind: 1,
        created_at: Math.floor(Date.now() / 1000),
        tags: [],
        content: `${titleRef.current?.value}\n\n${commentRef.current?.value}` || "",
        pubkey: getPublicKey(privateKey),
        id: "",
        sig: ""
      }

      event.id = getEventHash(event)
      event.sig = signEvent(event, privateKey)

      let ok = validateEvent(event)
      let veryOk = verifySignature(event)

      // todo: publlish to defaultRelays with NostrContext
      console.log('Event created but not published: ', event.id)

      // todo: route to issues page of the correct repo
      router.push("/issues");
    },
    [router]
  );

  const selectLabel = (label: string) => {
    if (!selectedLabels.includes(label)) {
      setSelectedLabels([
        label,
        ...selectedLabels
      ]);
    } else {
      setSelectedLabels(selectedLabels.filter(l => l !== label))
    }
  }

  return (
    <div className='flex justify-center mt-8 gap-2'>
      <Avatar className="w-8 h-8">
        <AvatarImage src={picture} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <div>
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-[#171B21] py-2 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <div className="mt-2">
                  <Input
                    id="title"
                    name="title"
                    type="text"
                    required
                    placeholder="Title"
                    className="w-full block w-96"
                    ref={titleRef}
                  />
                  <TextArea
                    id="comment"
                    name="comment"
                    type="textbox"
                    required
                    placeholder="Leave a comment"
                    className="w-full block w-96 h-96 mt-2"
                    ref={commentRef}
                  />
                </div>
              </div>
              <div className='text-center'>
                <Button
                  variant={"success"}
                  type="submit"
                  className="flex w-96 mb-2 justify-center"
                >
                  Submit new issue
                </Button>
                {errorMsg && <p className='text-red-500 mt-2'>{errorMsg}</p>}
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-3 w-96 p-2 divide-y divide-slate-200 bg-[#171B21] shadow sm:rounded-lg sm:px-3'>
        <div className='flex'>
          <div className='flex flex-col w-full p-2'>
            <div className='flex hover:text-purple-400 cursor-pointer'>
              <p className='w-full mb-2'>Assignees</p>
              <div className="hidden items-center md:inline">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="flex items-center cursor-pointer">
                      <Settings />
                      <ChevronDown className="mt-1 h-4 w-4 hover:text-white/80" />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Assign up to 10 people to this issue.</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Input
                        id="assigneesFilter"
                        name="assigneesFilter"
                        type="text"
                        placeholder="npub"
                        className="w-full block"
                        ref={assigneesFilterRef}
                      />

                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {/* todo: fetch contributors of this repo and list them here */}
                    <DropdownMenuGroup>
                      <p>npub #1</p>
                      <DropdownMenuSeparator />
                      <p>npub #2</p>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <span>
              <span className='text-grey-300/20'>No one yet ––</span>
              <span className='cursor-pointer text-purple-400'> assign yourself</span>
            </span>
          </div>
        </div>
        <div className='flex'>
          <div className='flex flex-col w-full p-2'>
            <div className='flex hover:text-purple-400 cursor-pointer'>
              <p className='w-full mb-2'>Labels</p>
              <div className="hidden items-center md:inline">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="flex items-center cursor-pointer">
                      <Settings />
                      <ChevronDown className="mt-1 h-4 w-4 hover:text-white/80" />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Apply labels to this issue.</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Input
                      id="labelsFilter"
                      name="labelsFilter"
                      type="text"
                      placeholder="Filter labels"
                      className="w-full block"
                      ref={labelsFilterRef}
                    />
                    <DropdownMenuSeparator />
                    {/* todo: fetch labels of this repo and replace mockLabels */}
                    {/* todo: publish labels with NostrContext when the dropdown menu hides */}
                    {/* todo: filter labels based on labelsFilterRef */}
                    <DropdownMenuGroup>
                      {mockLabels.map(label => {
                        return (
                          <div key={label}>
                            <div className='flex cursor-pointer p-1' onClick={() => selectLabel(label)}>
                              <span className='mr-1'>{label}</span>
                              {selectedLabels.includes(label) && <Check />}
                            </div>
                            <DropdownMenuSeparator />
                          </div>
                        )
                      })}
                      <div className='flex cursor-pointer p-1'>
                        <Edit />
                        { /* todo: link to the /labels page */}
                        <Link href={"#"} className="ml-2">{'Edit labels'}</Link>
                      </div>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className='flex gap-2'>
              {
                selectedLabels.length > 0 ? (
                  /* todo: different bg-color for each label */
                  selectedLabels.map(label => <span className='p-1 pl-2 pr-2 text-black bg-white sm:rounded-lg'>{label}</span>)
                ) : (
                  <span className='text-gray-300'>None yet</span>
                )
              }
            </div>
          </div>
        </div>
        <div className='flex'>
          <div className='flex flex-col w-full p-2'>
            <div className='flex hover:text-purple-400 cursor-pointer'>
              <p className='w-full mb-2'>Projects</p>
              <div>
                <Settings />
              </div>
            </div>
            <span className='text-gray-300'>None yet</span>
          </div>
        </div>
        <div className='flex'>
          <div className='flex flex-col w-full p-2'>
            <div className='flex hover:text-purple-400 cursor-pointer'>
              <p className='w-full mb-2'>Milestones</p>
              <div>
                <Settings />
              </div>
            </div>
            <span className='text-gray-300'>No milestone</span>
          </div>
        </div>
      </div>
    </div>
  );

}

const mockLabels = [
  'UI',
  'documentation'
]