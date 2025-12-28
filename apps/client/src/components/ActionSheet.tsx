/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { Nodekind, NodeMetadata } from "./CreateWorkflow";
import { useState } from "react"
import { Input } from "./ui/input";
import type { Tradingmetadata } from "common/types";
import { SUPPORTED_ASSETS } from "common/types";
import { Label } from "./ui/label";

const SUPPORTED_ACTIONS = [{
  id: "hyper-liquid",
  title: "hyper-liquid",
  Description: "Place a trade on hyperliquid exchange",
}, {
  id: "backpack",
  title: "Backpack",
  Description: "Place a trade on backpack exchange",
}, {
  id: "lighter",
  title: "lighter",
  Description: "Place a trade on lighter exchange",
}]


export const ActionSheet = ({
  onSelect,
}: {
  onSelect: (kind: Nodekind, metadata: NodeMetadata) => void
}) => {
  const [metadata, SetMetadata] = useState<Tradingmetadata | {}>({});
  const [selectedAction, setSelectedAction] = useState(SUPPORTED_ACTIONS[0].id)

  return (
    <Sheet open={true}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Select Action</SheetTitle>
          <SheetDescription>Choose an action and configure parameters.</SheetDescription>
        </SheetHeader>

        <div className="p-4 space-y-4">
          <div>
            <Label>Action</Label>
            <Select value={selectedAction} onValueChange={(value) => setSelectedAction(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select an action" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {SUPPORTED_ACTIONS.map(({ id, title }) => (
                    <SelectItem key={id} value={id}>{title}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {(selectedAction === "hyper-liquid" || selectedAction === "lighter" || selectedAction === "backpack") && (
            <div className="space-y-3">
              <div>
                <Label>Type</Label>
                <Select value={(metadata as any).type} onValueChange={(value) => SetMetadata(metadata => ({
                  ...metadata,
                  type: value
                }))}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Order type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value={"long"}>long</SelectItem>
                      <SelectItem value={"short"}>short</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Symbol</Label>
                <Select value={(metadata as any).symbol} onValueChange={(value) => SetMetadata(metadata => ({
                  ...metadata,
                  symbol: value
                }))}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a symbol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {SUPPORTED_ASSETS.map(asset => <SelectItem key={asset} value={asset}>{asset}</SelectItem>)}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Qty</Label>
                <Input value={(metadata as any).qty} onChange={(e) => SetMetadata(metadata => ({
                  ...metadata,
                  qty: Number(e.target.value)
                }))} />
              </div>
            </div>
          )}
        </div>

        <SheetFooter>
          <Button onClick={() => {
            onSelect(selectedAction as Nodekind, metadata as NodeMetadata);
          }} type="submit">Create Action</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )

}